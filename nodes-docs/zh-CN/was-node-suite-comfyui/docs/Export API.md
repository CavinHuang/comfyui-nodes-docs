# Documentation
- Class name: WAS_Export_API
- Category: WAS Suite/Debug
- Output node: True
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Export_API节点便于以结构化和有序的方式导出提示数据，确保输出以适当的命名约定和文件路径保存，便于检索和进一步分析。

# Input types
## Required
- save_prompt_api
    - 此参数控制API是否应保存提示数据。这对于维护工作流中使用的提示的记录非常重要，这对于调试和审查目的至关重要。
    - Comfy dtype: COMBO[[['true', 'true']]]
    - Python dtype: str
- output_path
    - 输出路径是必不可少的，因为它定义了将保存提示数据的目录。这确保了数据的组织性，并便于将来参考。
    - Comfy dtype: STRING
    - Python dtype: str
- filename_prefix
    - 文件名前缀用于为导出文件的命名提供一个一致的起点。它有助于在输出目录内更有效地分类和识别文件。
    - Comfy dtype: STRING
    - Python dtype: str
- filename_delimiter
    - 分隔符是一个关键元素，它将文件名前缀与数字计数器分开，确保导出的文件有一个系统化和有序的命名约定。
    - Comfy dtype: STRING
    - Python dtype: str
- filename_number_padding
    - 数字填充参数决定了数字计数器的格式，确保文件名整齐对齐，便于按时间或数字顺序排序。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- parse_text_tokens
    - 启用此功能时，它会解析并用相应值替换提示文本中的标记，这对于定制和个性化导出的数据至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- ui
    - 输出提供了格式化的提示数据的JSON表示形式，这对于确保导出的信息既有结构又可被机器读取至关重要。
    - Comfy dtype: COMBO[[{'string': 'Prompt JSON'}]]
    - Python dtype: Dict[str, str]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Export_API:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'save_prompt_api': (['true', 'true'],), 'output_path': ('STRING', {'default': './ComfyUI/output/', 'multiline': False}), 'filename_prefix': ('STRING', {'default': 'ComfyUI_Prompt'}), 'filename_delimiter': ('STRING', {'default': '_'}), 'filename_number_padding': ('INT', {'default': 4, 'min': 2, 'max': 9, 'step': 1}), 'parse_text_tokens': ('BOOLEAN', {'default': False})}, 'hidden': {'prompt': 'PROMPT'}}
    OUTPUT_NODE = True
    RETURN_TYPES = ()
    FUNCTION = 'export_api'
    CATEGORY = 'WAS Suite/Debug'

    def export_api(self, output_path=None, filename_prefix='ComfyUI', filename_number_padding=4, filename_delimiter='_', prompt=None, save_prompt_api='true', parse_text_tokens=False):
        delimiter = filename_delimiter
        number_padding = filename_number_padding if filename_number_padding > 1 else 4
        tokens = TextTokens()
        if output_path in [None, '', 'none', '.']:
            output_path = comfy_paths.output_directory
        else:
            output_path = tokens.parseTokens(output_path)
        pattern = f'{re.escape(filename_prefix)}{re.escape(filename_delimiter)}(\\d{{{number_padding}}})'
        existing_counters = [int(re.search(pattern, filename).group(1)) for filename in os.listdir(output_path) if re.match(pattern, filename)]
        existing_counters.sort(reverse=True)
        if existing_counters:
            counter = existing_counters[0] + 1
        else:
            counter = 1
        file = f'{filename_prefix}{filename_delimiter}{counter:0{number_padding}}.json'
        output_file = os.path.abspath(os.path.join(output_path, file))
        if prompt:
            if parse_text_tokens:
                prompt = self.parse_prompt(prompt, tokens, keys_to_parse)
            prompt_json = json.dumps(prompt, indent=4)
            cstr('Prompt API JSON').msg.print()
            print(prompt_json)
            if save_prompt_api == 'true':
                with open(output_file, 'w') as f:
                    f.write(prompt_json)
                cstr(f'Output file path: {output_file}').msg.print()
        return {'ui': {'string': prompt_json}}

    def parse_prompt(self, obj, tokens, keys_to_parse):
        if isinstance(obj, dict):
            return {key: self.parse_prompt(value, tokens, keys_to_parse) if key in keys_to_parse else value for (key, value) in obj.items()}
        elif isinstance(obj, list):
            return [self.parse_prompt(element, tokens, keys_to_parse) for element in obj]
        elif isinstance(obj, str):
            return tokens.parseTokens(obj)
        else:
            return obj
```