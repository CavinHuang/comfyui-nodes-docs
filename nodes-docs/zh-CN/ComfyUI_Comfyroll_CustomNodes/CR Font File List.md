# Documentation
- Class name: CR_FontFileList
- Category: Comfyroll/List/IO
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_FontFileList是一个用于生成指定目录中字体文件列表的节点。它可以从系统的字体目录、特定于Comfyroll的目录或用户定义的文件夹中获取字体。该节点能够处理大量的字体文件，并提供选项来指定开始索引和要列出的最大行数，确保了高效的数据处理和检索。

# Input types
## Required
- source_folder
    - source_folder参数决定了将列出字体文件的目录。它可以设置为'system'以列出系统字体目录中的字体，'Comfyroll'以列出Comfyroll目录中的字体，或者'from folder'以指定自定义文件夹路径。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- start_index
    - start_index参数用于指定字体文件列表中的起始点。它允许从列表的开始选择字体的子集，这对于大型字体集合特别有用。
    - Comfy dtype: INT
    - Python dtype: int
- max_rows
    - max_rows参数设置要列出的字体文件的最大数量。它是一个关键的设置，用于控制输出列表的大小并有效管理内存使用。
    - Comfy dtype: INT
    - Python dtype: int
- folder_path
    - folder_path参数是一个可选输入，当source_folder设置为'from folder'时，允许用户指定自定义目录路径。它使节点能够从用户定义的位置列出字体文件。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- LIST
    - LIST输出提供了基于输入参数从指定目录中选择的字体文件名列表。它是应用程序内进一步处理或显示的关键输出。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- show_help
    - show_help输出提供了一个URL链接到文档，以获得有关使用该节点的额外指导。对于寻求更多信息或故障排除的用户来说，它特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_FontFileList:

    @classmethod
    def INPUT_TYPES(s):
        comfyroll_font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'fonts')
        comfyroll_file_list = [f for f in os.listdir(comfyroll_font_dir) if os.path.isfile(os.path.join(comfyroll_font_dir, f)) and f.lower().endswith('.ttf')]
        sources = ['system', 'Comfyroll', 'from folder']
        return {'required': {'source_folder': (sources,), 'start_index': ('INT', {'default': 0, 'min': 0, 'max': 9999}), 'max_rows': ('INT', {'default': 1000, 'min': 1, 'max': 9999})}, 'optional': {'folder_path': ('STRING', {'default': 'C:\\Windows\\Fonts', 'multiline': False})}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('LIST', 'show_help')
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = 'make_list'
    CATEGORY = icons.get('Comfyroll/List/IO')

    def make_list(self, source_folder, start_index, max_rows, folder_path='C:\\Windows\\Fonts'):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-font-file-list'
        if source_folder == 'system':
            system_root = os.environ.get('SystemRoot')
            system_font_dir = os.path.join(system_root, 'Fonts')
            file_list = [f for f in os.listdir(system_font_dir) if os.path.isfile(os.path.join(system_font_dir, f)) and f.lower().endswith('.ttf')]
        elif source_folder == 'Comfyroll':
            comfyroll_font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'fonts')
            file_list = [f for f in os.listdir(comfyroll_font_dir) if os.path.isfile(os.path.join(comfyroll_font_dir, f)) and f.lower().endswith('.ttf')]
        elif source_folder == 'from folder':
            if folder_path != '' and folder_path is not None:
                if not os.path.exists(folder_path):
                    print(f'[Warning] CR Font File List: The folder_path `{folder_path}` does not exist')
                    return None
                font_dir = folder_path
                file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith('.ttf')]
            else:
                print(f'[Warning] CR Font File List: No folder_path entered')
                return None
        else:
            pass
        start_index = max(0, min(start_index, len(file_list) - 1))
        end_index = min(start_index + max_rows, len(file_list))
        selected_files = file_list[start_index:end_index]
        return (selected_files, show_help)
```