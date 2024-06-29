# Documentation
- Class name: LoadImagesFromDirectoryUpload
- Category: Video Helper Suite 🎥🅥🅗🅢
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

LoadImagesFromDirectoryUpload节点旨在从指定目录加载图像数据。它简化了访问和准备图像以进行进一步处理或分析的过程，抽象化了文件处理和目录导航的复杂性。

# Input types
## Required
- directory
    - ‘directory’参数指定了加载图像的源目录。这对于确定节点将处理的图像数据的范围和内容至关重要。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- image_load_cap
    - ‘image_load_cap’参数是可选的，它允许限制从目录中加载的图像数量。它提供了一种控制处理数据量的方法，这在优化资源使用方面可能非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- skip_first_images
    - ‘skip_first_images’参数使节点能够跳过目录开头指定数量的图像。在某些图像与当前任务或分析无关的情况下，这可能很有用。
    - Comfy dtype: INT
    - Python dtype: int
- select_every_nth
    - ‘select_every_nth’参数用于在由参数值定义的固定间隔中从目录选择图像。在只需要图像子集的情况下，这有助于简化处理过程。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - ‘IMAGE’输出提供了加载的图像数据，这是节点操作的主要结果。它代表了可以进一步操作或分析的视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- MASK
    - ‘MASK’输出在适用时提供与加载的图像相关联的二进制或分类掩码。这对于需要基于图像内感兴趣区域进行分割或分类的任务非常有用。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- INT
    - 如果存在，‘INT’输出类型可能代表与图像相关联的额外数值数据或元数据。它可以提供补充视觉数据的定量信息。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class LoadImagesFromDirectoryUpload:

    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        directories = []
        for item in os.listdir(input_dir):
            if not os.path.isfile(os.path.join(input_dir, item)) and item != 'clipspace':
                directories.append(item)
        return {'required': {'directory': (directories,)}, 'optional': {'image_load_cap': ('INT', {'default': 0, 'min': 0, 'max': BIGMAX, 'step': 1}), 'skip_first_images': ('INT', {'default': 0, 'min': 0, 'max': BIGMAX, 'step': 1}), 'select_every_nth': ('INT', {'default': 1, 'min': 1, 'max': BIGMAX, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'MASK', 'INT')
    FUNCTION = 'load_images'
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢'

    def load_images(self, directory: str, **kwargs):
        return load_images(directory, **kwargs)

    @classmethod
    def IS_CHANGED(s, directory: str, **kwargs):
        return is_changed_load_images(directory, **kwargs)

    @classmethod
    def VALIDATE_INPUTS(s, directory: str, **kwargs):
        return validate_load_images(directory)
```