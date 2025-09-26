from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="MCP Server")

# Data model
class Item(BaseModel):
    id: int
    name: str
    description: str

# In-memory DB
db: List[Item] = []

@app.get("/items", response_model=List[Item])
def get_items():
    return db

@app.post("/items", response_model=Item)
def create_item(item: Item):
    db.append(item)
    return item

@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: int):
    for item in db:
        if item.id == item_id:
            return item
    return {"error": "Item not found"}

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    global db
    db = [item for item in db if item.id != item_id]
    return {"message": "Item deleted"}
