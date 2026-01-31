from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def check_is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    # Build adjacency list
    adj = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in adj:
            adj[source].append(target)
    
    # Cycle detection using DFS
    visited = set()
    recursion_stack = set()
    
    def dfs(node_id):
        visited.add(node_id)
        recursion_stack.add(node_id)
        
        if node_id in adj:
            for neighbor in adj[node_id]:
                if neighbor not in visited:
                    if dfs(neighbor):
                        return True
                elif neighbor in recursion_stack:
                    return True
        
        recursion_stack.remove(node_id)
        return False

    for node in nodes:
        if node['id'] not in visited:
            if dfs(node['id']):
                return False # Cycle detected, not a DAG
                
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = check_is_dag(pipeline.nodes, pipeline.edges)
    
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
