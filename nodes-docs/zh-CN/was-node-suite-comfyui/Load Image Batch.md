# Documentation
- Class name: WAS_Load_Image_Batch
- Category: WAS Suite/IO
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Load_Image_Batch 节点旨在高效地加载和管理图像文件批次。它提供以不同模式加载图像的功能，如单张图像、增量图像或随机选择。该节点确保图像正确定向，并且在需要时可以处理 RGBA 到 RGB 的转换。它还能够根据指定去除文件名中的文件扩展名。

# Input types
## Required
- path
    - 'path' 参数指定了图像文件所在的目录路径。这对于节点定位和访问所需处理的图像文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- pattern
    - 'pattern' 参数用于根据特定模式过滤图像文件。它对于在指定目录内选择符合给定标准的图像子集很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- index
    - 'index' 参数是一个整数，表示要加载的批次中图像的具体位置。当模式设置为 'single_image' 时，它在确定要检索的确切图像时起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- mode
    - 'mode' 参数确定加载图像的方法。它可以是 'single_image' 用于加载特定图像，'incremental_image' 用于顺序访问，或 'random' 用于随机选择。
    - Comfy dtype: COMBO['single_image', 'incremental_image', 'random']
    - Python dtype: str
- label
    - 'label' 参数是一个字符串，用于标识和分类图像批次。它有助于在节点操作中组织和跟踪不同的图像集。
    - Comfy dtype: STRING
    - Python dtype: str
- allow_RGBA_output
    - 'allow_RGBA_output' 参数决定是否允许输出图像具有 RGBA 通道。如果设置为 'false'，则节点将图像转换为 RGB。
    - Comfy dtype: COMBO['false', 'true']
    - Python dtype: str
- filename_text_extension
    - 'filename_text_extension' 参数指示是否在文件名文本输出中包含文件扩展名。在不需要文件扩展名的文件名中，它很有用。
    - Comfy dtype: COMBO['true', 'false']
    - Python dtype: str

# Output types
- image
    - 'image' 输出提供了指定批次中加载的图像。它是节点功能内图像处理任务的主要输出。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- filename_text
    - 'filename_text' 输出返回加载的图像文件的名称，可以用于参考或在节点之外进行进一步处理。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Load_Image_Batch:

    def __init__(self):
        self.HDB = WASDatabase(WAS_HISTORY_DATABASE)

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mode': (['single_image', 'incremental_image', 'random'],), 'index': ('INT', {'default': 0, 'min': 0, 'max': 150000, 'step': 1}), 'label': ('STRING', {'default': 'Batch 001', 'multiline': False}), 'path': ('STRING', {'default': '', 'multiline': False}), 'pattern': ('STRING', {'default': '*', 'multiline': False}), 'allow_RGBA_output': (['false', 'true'],)}, 'optional': {'filename_text_extension': (['true', 'false'],)}}
    RETURN_TYPES = ('IMAGE', TEXT_TYPE)
    RETURN_NAMES = ('image', 'filename_text')
    FUNCTION = 'load_batch_images'
    CATEGORY = 'WAS Suite/IO'

    def load_batch_images(self, path, pattern='*', index=0, mode='single_image', label='Batch 001', allow_RGBA_output='false', filename_text_extension='true'):
        allow_RGBA_output = allow_RGBA_output == 'true'
        if not os.path.exists(path):
            return (None,)
        fl = self.BatchImageLoader(path, label, pattern)
        new_paths = fl.image_paths
        if mode == 'single_image':
            (image, filename) = fl.get_image_by_id(index)
            if image == None:
                cstr(f'No valid image was found for the inded `{index}`').error.print()
                return (None, None)
        elif mode == 'incremental_image':
            (image, filename) = fl.get_next_image()
            if image == None:
                cstr(f'No valid image was found for the next ID. Did you remove images from the source directory?').error.print()
                return (None, None)
        else:
            newindex = int(random.random() * len(fl.image_paths))
            (image, filename) = fl.get_image_by_id(newindex)
            if image == None:
                cstr(f'No valid image was found for the next ID. Did you remove images from the source directory?').error.print()
                return (None, None)
        update_history_images(new_paths)
        if not allow_RGBA_output:
            image = image.convert('RGB')
        if filename_text_extension == 'false':
            filename = os.path.splitext(filename)[0]
        return (pil2tensor(image), filename)

    class BatchImageLoader:

        def __init__(self, directory_path, label, pattern):
            self.WDB = WDB
            self.image_paths = []
            self.load_images(directory_path, pattern)
            self.image_paths.sort()
            stored_directory_path = self.WDB.get('Batch Paths', label)
            stored_pattern = self.WDB.get('Batch Patterns', label)
            if stored_directory_path != directory_path or stored_pattern != pattern:
                self.index = 0
                self.WDB.insert('Batch Counters', label, 0)
                self.WDB.insert('Batch Paths', label, directory_path)
                self.WDB.insert('Batch Patterns', label, pattern)
            else:
                self.index = self.WDB.get('Batch Counters', label)
            self.label = label

        def load_images(self, directory_path, pattern):
            for file_name in glob.glob(os.path.join(glob.escape(directory_path), pattern), recursive=True):
                if file_name.lower().endswith(ALLOWED_EXT):
                    abs_file_path = os.path.abspath(file_name)
                    self.image_paths.append(abs_file_path)

        def get_image_by_id(self, image_id):
            if image_id < 0 or image_id >= len(self.image_paths):
                cstr(f'Invalid image index `{image_id}`').error.print()
                return
            i = Image.open(self.image_paths[image_id])
            i = ImageOps.exif_transpose(i)
            return (i, os.path.basename(self.image_paths[image_id]))

        def get_next_image(self):
            if self.index >= len(self.image_paths):
                self.index = 0
            image_path = self.image_paths[self.index]
            self.index += 1
            if self.index == len(self.image_paths):
                self.index = 0
            cstr(f'{cstr.color.YELLOW}{self.label}{cstr.color.END} Index: {self.index}').msg.print()
            self.WDB.insert('Batch Counters', self.label, self.index)
            i = Image.open(image_path)
            i = ImageOps.exif_transpose(i)
            return (i, os.path.basename(image_path))

        def get_current_image(self):
            if self.index >= len(self.image_paths):
                self.index = 0
            image_path = self.image_paths[self.index]
            return os.path.basename(image_path)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        if kwargs['mode'] != 'single_image':
            return float('NaN')
        else:
            fl = WAS_Load_Image_Batch.BatchImageLoader(kwargs['path'], kwargs['label'], kwargs['pattern'])
            filename = fl.get_current_image()
            image = os.path.join(kwargs['path'], filename)
            sha = get_sha256(image)
            return sha
```