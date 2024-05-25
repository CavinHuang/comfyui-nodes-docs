from .server import *

WEB_DIRECTORY = "./web/comfyui"
NODE_CLASS_MAPPINGS = {}

__all__ = ['WEB_DIRECTORY', 'NODE_CLASS_MAPPINGS']


MAGENTA = '\033[95m'
RESET = '\033[0m'
print(f"{MAGENTA}==============================================")
print(f"{MAGENTA}[comfyui-nodes-docs]{RESET}Loaded comfyui-nodes-docs plugin")
print(f"{MAGENTA}=============================================={RESET}")
