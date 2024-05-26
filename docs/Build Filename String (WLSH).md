# Documentation
- Class name: WLSH_Build_Filename_String
- Category: WLSH Nodes/text
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点通过将时间戳、模型名称、种子和计数器合并到可定制的模板中来生成唯一的文件名字符串。它旨在为各种应用创建可识别和有组织的文件名。

# Input types
## Required
- filename
    - 基础名称，最终文件名基于此构建。它作为插入其他参数的模板。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- modelname
    - 模型的名称，用于标识并纳入文件名中。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 用于增加文件名的多样性和唯一性的数值。
    - Comfy dtype: INT
    - Python dtype: int
- counter
    - 一个整数，当与相同的基础文件名和参数一起使用时，用于创建一系列文件名。
    - Comfy dtype: SEED
    - Python dtype: int
- time_format
    - 定义时间戳插入文件名的格式。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- filename
    - 最终输出是一个格式化的字符串，代表构建的文件名，包含所有提供的参数。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Build_Filename_String:

    def __init__(s):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'filename': ('STRING', {'%time_%seed': 'info', 'multiline': False})}, 'optional': {'modelname': ('STRING', {'default': '', 'multiline': False}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'counter': ('SEED', {'default': 0}), 'time_format': ('STRING', {'default': '%Y-%m-%d-%H%M%S', 'multiline': False})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('filename',)
    FUNCTION = 'build_filename'
    CATEGORY = 'WLSH Nodes/text'

    def build_filename(self, filename='ComfyUI', modelname='model', time_format='%Y-%m-%d-%H%M%S', seed=0, counter=0):
        filename = make_filename(filename, seed, modelname, counter, time_format)
        return filename
```