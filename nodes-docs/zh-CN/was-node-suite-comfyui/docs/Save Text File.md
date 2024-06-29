# Documentation
- Class name: WAS_Text_Save
- Category: WAS Suite/IO
- Output node: True
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_Save节点旨在管理将文本数据保存到文件的过程。它处理目录的创建，检查空文本，并生成具有适当填充和分隔符的文件名。节点确保保存的文件具有唯一名称并存储在指定的路径中。

# Input types
## Required
- text
    - 文本参数代表打算保存到文件的文本内容。它是节点操作的基础部分，因为它是正在管理的主要数据。
    - Comfy dtype: STRING
    - Python dtype: str
- path
    - 路径参数指定将保存文本文件的目录。它对于确定文件在文件系统中的位置至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- filename_prefix
    - 文件名前缀参数设置文件名的起始字符。它有助于保存文件的唯一性和组织性。
    - Comfy dtype: STRING
    - Python dtype: str
- filename_delimiter
    - 文件名分隔符参数定义用于分隔文件名前缀和数字部分的字符。它有助于区分文件名的不同部分。
    - Comfy dtype: STRING
    - Python dtype: str
- filename_number_padding
    - 文件名数字填充参数确定用于文件名数字部分的位数。它确保文件名的格式一致。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- text
    - 文本输出参数返回保存到文件的文本，提供已写入数据的确认。
    - Comfy dtype: STRING
    - Python dtype: str
- ui
    - ui输出参数用于提供用户界面反馈。它通常包含已保存文本的字符串表示。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Dict[str, str]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Save:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'forceInput': True}), 'path': ('STRING', {'default': './ComfyUI/output/[time(%Y-%m-%d)]', 'multiline': False}), 'filename_prefix': ('STRING', {'default': 'ComfyUI'}), 'filename_delimiter': ('STRING', {'default': '_'}), 'filename_number_padding': ('INT', {'default': 4, 'min': 2, 'max': 9, 'step': 1})}}
    OUTPUT_NODE = True
    RETURN_TYPES = ()
    FUNCTION = 'save_text_file'
    CATEGORY = 'WAS Suite/IO'

    def save_text_file(self, text, path, filename_prefix='ComfyUI', filename_delimiter='_', filename_number_padding=4):
        tokens = TextTokens()
        path = tokens.parseTokens(path)
        filename_prefix = tokens.parseTokens(filename_prefix)
        if not os.path.exists(path):
            cstr(f"The path `{path}` doesn't exist! Creating it...").warning.print()
            try:
                os.makedirs(path, exist_ok=True)
            except OSError as e:
                cstr(f'The path `{path}` could not be created! Is there write access?\n{e}').error.print()
        if text.strip() == '':
            cstr(f'There is no text specified to save! Text is empty.').error.print()
        delimiter = filename_delimiter
        number_padding = int(filename_number_padding)
        file_extension = '.txt'
        filename = self.generate_filename(path, filename_prefix, delimiter, number_padding, file_extension)
        file_path = os.path.join(path, filename)
        self.writeTextFile(file_path, text)
        update_history_text_files(file_path)
        return (text, {'ui': {'string': text}})

    def generate_filename(self, path, prefix, delimiter, number_padding, extension):
        pattern = f'{re.escape(prefix)}{re.escape(delimiter)}(\\d{{{number_padding}}})'
        existing_counters = [int(re.search(pattern, filename).group(1)) for filename in os.listdir(path) if re.match(pattern, filename)]
        existing_counters.sort(reverse=True)
        if existing_counters:
            counter = existing_counters[0] + 1
        else:
            counter = 1
        filename = f'{prefix}{delimiter}{counter:0{number_padding}}{extension}'
        while os.path.exists(os.path.join(path, filename)):
            counter += 1
            filename = f'{prefix}{delimiter}{counter:0{number_padding}}{extension}'
        return filename

    def writeTextFile(self, file, content):
        try:
            with open(file, 'w', encoding='utf-8', newline='\n') as f:
                f.write(content)
        except OSError:
            cstr(f'Unable to save file `{file}`').error.print()
```