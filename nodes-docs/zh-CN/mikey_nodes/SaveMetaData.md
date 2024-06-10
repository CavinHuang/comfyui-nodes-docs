# Documentation
- Class name: SaveMetaData
- Category: Mikey/Meta
- Output node: True
- Repo Ref: https://github.com/bash-j/mikey_nodes

`save_metadata` 方法旨在组织和存储与图像相关的元数据。它创建一个文本文件，其中包含相关的信息，如时间戳、文件名前缀以及用户提供的额外细节。此方法确保每个图像的元数据都被系统地记录并易于访问。

# Input types
## Required
- image
    - 图像参数是必需的，因为它是元数据将关联的视觉内容。这是一个必需的输入，并且在节点的操作中起着核心作用，因为它是正在保存的元数据的主题。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or similar image object
## Optional
- filename_prefix
    - 文件名前缀参数用于定义元数据文件的文件名的起始部分。虽然它不是强制性的，但对于以有意义的方式组织文件很重要，如果没有提供，可以设置为默认值。
    - Comfy dtype: STRING
    - Python dtype: str
- timestamp_prefix
    - 时间戳前缀参数决定是否在文件名中包含时间戳。它提供了一种按时间顺序组织文件的方法，默认设置为'true'，表示应该包含时间戳。
    - Comfy dtype: COMBO[true, false]
    - Python dtype: bool
- counter
    - 计数器参数用于将数字计数器附加到文件名，确保唯一性并防止文件覆盖。默认设置为'true'，突出了它在维护文件完整性方面的重要性。
    - Comfy dtype: COMBO[true, false]
    - Python dtype: bool
- prompt
    - 提示参数是一个可选输入，可以用来提供可能与元数据相关的额外上下文或信息。它可以增强元数据的描述性，而不是一个强制性要求。
    - Comfy dtype: PROMPT
    - Python dtype: dict
- extra_pnginfo
    - 额外的png信息参数用于包含特定于图像的额外信息，如注释或其他详细信息。这个可选输入允许保存更全面的元数据集。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: dict

# Output types
- save_metadata
    - save_metadata 方法的输出是一个包含已保存元数据的文件名和子文件夹的字典。这个输出提供了保存操作的确认以及保存的元数据的位置。
    - Comfy dtype: COMBO[filename, subfolder]
    - Python dtype: Dict[str, Union[str, Dict[str, str]]]

# Usage tips
- Infra type: CPU

# Source code
```
class SaveMetaData:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'filename_prefix': ('STRING', {'default': ''}), 'timestamp_prefix': (['true', 'false'], {'default': 'true'}), 'counter': (['true', 'false'], {'default': 'true'})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save_metadata'
    CATEGORY = 'Mikey/Meta'
    OUTPUT_NODE = True

    def save_metadata(self, image, filename_prefix, timestamp_prefix, counter, prompt=None, extra_pnginfo=None):
        filename_prefix = search_and_replace(filename_prefix, extra_pnginfo, prompt)
        (full_output_folder, filename, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path(filename_prefix, folder_paths.get_output_directory(), 1, 1)
        ts_str = datetime.datetime.now().strftime('%y%m%d%H%M')
        filen = ''
        if timestamp_prefix == 'true':
            filen += ts_str + '_'
        filen = filen + filename_prefix
        if counter == 'true':
            filen += '_' + str(counter)
        filename = filen + '.txt'
        file_path = os.path.join(full_output_folder, filename)
        with open(file_path, 'w') as file:
            for (key, value) in extra_pnginfo.items():
                file.write(f'{key}: {value}\n')
            for (key, value) in prompt.items():
                file.write(f'{key}: {value}\n')
        return {'save_metadata': {'filename': filename, 'subfolder': subfolder}}
```