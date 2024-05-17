import os
from server import PromptServer
from aiohttp import web

WEB_DIRECTORY = "./web/comfyui"

__all__ = ['WEB_DIRECTORY']

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

@PromptServer.instance.routes.get("/customnode/getNodeInfo")
async def fetch_customnode_node_info(request):
  try:
    node_name = request.rel_url.query["nodeName"]

    if not node_name:
      return web.json_response({"content": ""})

    file_path = os.path.join(CURRENT_DIR, 'docs', node_name + '.md')
    if os.path.exists(file_path):
      with open(file_path, 'r', encoding='utf-8') as file:
        return web.json_response({"content": file.read()})
    else:
      return web.json_response({"content": ""})
  except Exception as e:
    return web.json_response({"content": ""})
