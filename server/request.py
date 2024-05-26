
import json
import os
from server import PromptServer
from aiohttp import web,ClientSession
import asyncio
import zipfile
import tempfile

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

root_dir = os.path.join(CURRENT_DIR, '..')

cache_dir = os.path.join(root_dir, '.cache')
docs_dir = os.path.join(root_dir, 'docs')
setting_path = os.path.join(cache_dir, '.setting.json')
device_id_path = os.path.join(cache_dir, '.cache_d_id')

# 根据设备名称和设备信息 ip地址，创建一个唯一的设备ID
def create_device_id():
    import hashlib
    import socket
    import uuid

    # 获取设备名称
    device_name = socket.gethostname()
    # 获取设备IP地址
    device_ip = socket.gethostbyname(device_name)
    # 获取设备唯一标识
    device_uuid = str(uuid.getnode())
    # 创建设备ID
    device_id = hashlib.md5((device_name + device_ip + device_uuid ).encode('utf-8')).hexdigest()
    return device_id

if not os.path.exists(cache_dir):
  os.makedirs(cache_dir, 755)

# 获取节点文档内容
def get_node_doc_file_content(node_name):
  file_path = os.path.join(docs_dir, node_name + '.md')
  if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
      return file.read()
  else:
    return ""

# 获取节点缓存文档
def get_node_cache_file_content(node_name):
  file_path = os.path.join(cache_dir, node_name + '.md')
  if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
      return file.read()
  else:
    return ""

# 写入缓存文件
def write_cache_file(node_name, content):
  file_path = os.path.join(cache_dir, node_name + '.md')
  print(file_path)
  with open(file_path, 'w', encoding='utf-8') as file:
    file.write(content)

def write_device_id():
   # 创建设备ID
  device_id = create_device_id()
  # 写入缓存文件
  with open(device_id_path, 'w', encoding='utf-8') as file:
    file.write(device_id)
  return device_id

write_device_id()

def get_device_id():
  if os.path.exists(device_id_path):
    with open(device_id_path, 'r', encoding='utf-8') as file:
      return file.read()
  else:
    divce_id = write_device_id()
    return divce_id

# Add route to fetch node info
@PromptServer.instance.routes.get("/customnode/getNodeInfo")
async def fetch_customnode_node_info(request):
  try:
    node_name = request.rel_url.query["nodeName"]

    if not node_name:
      return web.json_response({"content": ""})

    cache_content = get_node_cache_file_content(node_name)

    if len(cache_content) > 0 :
      return web.json_response({"content": cache_content})

    content = get_node_doc_file_content(node_name)
    return web.json_response({"content": content})
  except Exception as e:
    return web.json_response({"content": ""})

# Add route to cache node info
@PromptServer.instance.routes.get("/customnode/cacheNodeInfo")
async def cache_customnode_node_info(request):
  try:
    node_name = request.rel_url.query["nodeName"]

    if not node_name:
      return web.json_response({"success": False, "content": ""})

    print('cache start')
    if not os.path.exists(os.path.join(cache_dir, node_name + '.md')):
      print('cache file not exists')
      content = get_node_doc_file_content(node_name)
      write_cache_file(node_name, content)
      print('cache success')
      return web.json_response({"success": True, "content": content})
    return web.json_response({"success": True, "content": ''})
  except Exception as e:
    print(e)
    return web.json_response({"success": False, "content": ''})

# Add route to update node info
@PromptServer.instance.routes.post("/customnode/updateNodeInfo")
async def update_customnode_node_info(request):
  try:
    json_data = await request.json()
    node_name = json_data["nodeName"]
    # node_name = request.rel_url.query["nodeName"]
    content = json_data["content"]

    if not node_name:
      return web.json_response({"success": False})

    write_cache_file(node_name, content)

    contribute = get_setting_item('contribute')
    if contribute == True:
      print('send doc to cloud')
      asyncio.create_task(send_doc_to_cloud(node_name, content))

    return web.json_response({"success": True})
  except Exception as e:
    return web.json_response({"success": False})

# ================================== 以下是导出节点文档的代码 ==================================
def get_all_files(directory):
    """ 获取目录下所有文件的路径 """
    file_paths = []
    for root, _, files in os.walk(directory):
        for file in files:
            file_paths.append(os.path.join(root, file))
    return file_paths

def collect_unique_files(dir1, dir2):
    """ 收集两个目录下的所有文件，按文件名去重 """
    unique_files = {}
    for file_path in get_all_files(dir1) + get_all_files(dir2):
        file_name = os.path.basename(file_path)
        if file_name not in unique_files:
            unique_files[file_name] = file_path
    return unique_files.values()

def zip_files(file_paths, output_zip):
    """ 将文件打包成ZIP，并平铺存储 """
    with zipfile.ZipFile(output_zip, 'w') as zipf:
        for file_path in file_paths:
            arcname = os.path.basename(file_path)  # 只使用文件名，不保留路径
            zipf.write(file_path, arcname=arcname)

# Add route to export node info
@PromptServer.instance.routes.get("/customnode/exportNodeInfo")
async def export_customnode_node_info(request):
  # 把所有的缓存文件和docs文件夹下的文件打包成zip文件
  """ 生成ZIP文件并返回文件流响应 """

  unique_files = collect_unique_files(cache_dir, docs_dir)

  # 使用临时文件存储ZIP
  temp_zip = tempfile.NamedTemporaryFile(delete=False)
  try:
      with zipfile.ZipFile(temp_zip, 'w') as zipf:
          for file_path in unique_files:
              arcname = os.path.basename(file_path)
              zipf.write(file_path, arcname=arcname)

      temp_zip.seek(0)

      # 生成StreamResponse响应
      response = web.StreamResponse()
      response.headers['Content-Type'] = 'application/zip'
      response.headers['Content-Disposition'] = 'attachment; filename="output.zip"'

      await response.prepare(request)

      with open(temp_zip.name, 'rb') as f:
          while chunk := f.read(8192):
              await response.write(chunk)

      await response.write_eof()
      print(response)
      return response
  except Exception as e:
     print(e)
  finally:
      os.remove(temp_zip.name)  # 删除临时文件

# Add route to import node info
@PromptServer.instance.routes.post("/customnode/importNodeInfo")
async def import_customnode_node_info(request):
  # 接收上传的ZIP文件并解压到指定目录
  """ 接收上传的ZIP文件并解压到指定目录 """
  try:
    data = await request.post()
    zip_file = data.get('file')

    # 保存上传的ZIP文件
    zip_path = os.path.join(CURRENT_DIR, 'upload.zip')
    with open(zip_path, 'wb') as f:
        f.write(zip_file.file.read())

    # 解压ZIP文件到.cache目录，并且覆盖原有文件
    with zipfile.ZipFile(zip_path, 'r') as zipf:
        zipf.extractall(cache_dir)

    os.remove(zip_path)  # 删除上传的ZIP文件
    return web.json_response({"success": True})
  except Exception as e:
    return web.json_response({"success": False})


# 获取设置
def get_setting():
  if os.path.exists(setting_path):
    with open(setting_path, 'r', encoding='utf-8') as file:
      return file.read()
  else:
    return "{}"

# 获取设置的每一项
def get_setting_item(key):
  setting = get_setting()
  setting_json = json.loads(setting)
  return setting_json[key]

# 保存设置到文件
def save_setting(setting):
  with open(setting_path, 'w', encoding='utf-8') as file:
    file.write(setting)

if not os.path.exists(setting_path):
  save_setting('{"contribute": true}')

# 更新设置到本地.setting.json
@PromptServer.instance.routes.post("/customnode/updateSetting")
async def update_setting(request):
  try:
    json_data = await request.json()
    setting = json_data
    # 跟缓存文件的设置项每一项对比，如果有不同则更新
    cache_setting = get_setting()
    cache_setting_json = json.loads(cache_setting)
    for key in setting:
      cache_setting_json[key] = setting[key]

    # 保存设置到文件，缩近2空格
    save_setting(json.dumps(cache_setting_json, indent=2))

    return web.json_response({"success": True})
  except Exception as e:
    return web.json_response({"success": False})

# 发送当前文档到云
async def send_doc_to_cloud(node_type, content):
  url = 'http://comfy.zukmb.cn/api/saveNodesDocs'
  async with ClientSession() as session:
      device_id = get_device_id()
      data = {
        'device_id': device_id,
        'node_type': node_type,
        'content': content
      }
      print('send doc to cloud')
      async with session.post(url, data=data) as response:
        print(await response.text())
  # try:

  #   # url = 'http://localhost:8080/api/saveNodesDocs'
  #   # data = {
  #   #   'device_id': device_id,
  #   #   'node_type': node_type,
  #   #   'content': content
  #   # }
  #   # requests.post(url, data=data)
  # except Exception as e:
  #   print(e)