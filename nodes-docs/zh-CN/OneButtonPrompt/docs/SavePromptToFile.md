# Documentation
- Class name: SavePromptToFile
- Category: OneButtonPrompt
- Output node: True
- Repo Ref: https://github.com/AIrjen/OneButtonPrompt

该节点便于将提示保存到文件中，确保信息以有序和易于访问的方式存储。它通过自动化文件命名和存储过程来增强工作流程，这对于保持清晰的提示记录及其相关数据至关重要。

# Input types
## Required
- filename_prefix
    - 文件名前缀对于生成唯一且可识别的文件名至关重要，有助于高效地组织和引用保存的提示。
    - Comfy dtype: STRING
    - Python dtype: str
- positive_prompt
    - 正面提示是设置保存提示的基调和内容的关键输入，影响保存数据的整体上下文和实用性。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - 负面提示作为正面提示的对立面，提供了对比视角，对于理解提示的细微差别具有重要价值。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- prompt_g
    - 额外的提示可以提供补充信息或上下文，丰富保存的数据，提供更全面的提示范围理解。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt_l
    - 较长的提示可以提供扩展的细节或示例，这可能增强保存提示的深度和适用性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- status
    - 状态输出确认了保存操作的成功执行，确保提示已正确保存和存储。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SavePromptToFile:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = 'output'
        self.prefix_append = ''

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'filename_prefix': ('STRING', {'default': 'Prompt'}), 'positive_prompt': ('STRING', {'multiline': True}), 'negative_prompt': ('STRING', {'multiline': True})}, 'optional': {'prompt_g': ('STRING', {'multiline': True}), 'prompt_l': ('STRING', {'multiline': True})}}
    OUTPUT_NODE = True
    RETURN_TYPES = ()
    FUNCTION = 'saveprompttofile'
    CATEGORY = 'OneButtonPrompt'

    def saveprompttofile(self, positive_prompt, prompt_g, prompt_l, negative_prompt, filename_prefix):
        filename_prefix += self.prefix_append
        pattern = '%date:([^\\%]+)%'
        match = re.search(pattern, filename_prefix)
        if match:
            date_format = match.group(1)
            current_date = datetime.now()
            date_format = date_format.replace('M', 'X')
            date_format = date_format.replace('m', 'Z')
            if platform.system() == 'Windows':
                date_format = date_format.replace('yyyy', '%Y')
                date_format = date_format.replace('yy', '%#y')
                date_format = date_format.replace('X', '%#m')
                date_format = date_format.replace('d', '%#d')
                date_format = date_format.replace('h', '%#H')
                date_format = date_format.replace('Z', '%#M')
                date_format = date_format.replace('s', '%#S')
            else:
                date_format = date_format.replace('yyyy', '%Y')
                date_format = date_format.replace('yy', '%-y')
                date_format = date_format.replace('X', '%-m')
                date_format = date_format.replace('d', '%-d')
                date_format = date_format.replace('h', '%-H')
                date_format = date_format.replace('Z', '%-M')
                date_format = date_format.replace('s', '%-S')
            formatted_date = current_date.strftime(date_format)
            filename_prefix = re.sub(pattern, formatted_date, filename_prefix)
        (full_output_folder, filename_short, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path(filename_prefix, self.output_dir)
        if positive_prompt.find('of a ') != -1:
            start_index = positive_prompt.find('of a ') + len('of a ')
            end_index = positive_prompt.find(',', start_index)
            if end_index == -1:
                end_index = len(positive_prompt)
        else:
            start_index = 0
            end_index = 128
        filename = positive_prompt[start_index:end_index]
        filename = filename.replace('"', '')
        filename = filename.replace('[', '')
        filename = filename.replace('|', '')
        filename = filename.replace(']', '')
        filename = filename.replace('<', '')
        filename = filename.replace('>', '')
        filename = filename.replace(':', '_')
        filename = filename.replace('.', '')
        filename = re.sub('[0-9]+', '', filename)
        safe_characters = set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.')
        filename = re.sub('[^{}]+'.format(re.escape(''.join(safe_characters))), '', filename)
        if filename == '':
            filename = str(uuid.uuid4())
        if filename_prefix == '':
            now = datetime.now()
            filenamecomplete = now.strftime('%Y%m%d%H%M%S') + '_' + filename.replace(' ', '_').strip() + '.txt'
        else:
            formatted_counter = str(counter + 1).zfill(5)
            filenamecomplete = filename_short + '_' + formatted_counter + '_' + filename.replace(' ', '_').strip() + '.txt'
        directoryandfilename = os.path.abspath(os.path.join(full_output_folder, filenamecomplete))
        with open(directoryandfilename, 'w', encoding='utf-8') as file:
            file.write('prompt: ' + positive_prompt + '\n')
            if len(prompt_g) > 0:
                file.write('prompt_g: ' + prompt_g + '\n')
            if len(prompt_l) > 0:
                file.write('prompt_l: ' + prompt_l + '\n')
            file.write('negative prompt: ' + negative_prompt + '\n')
        return 'done'
```