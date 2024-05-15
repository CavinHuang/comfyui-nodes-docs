# Documentation
- Class name: SaveAnimatedPNG
- Category: image/animation
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaveAnimatedPNG节点旨在高效地将一系列图像保存为动画PNG文件。它考虑了帧率和压缩级别，以优化动画的性能和存储需求。该节点在图像生成工作流的最终输出阶段扮演着关键角色，确保生成的动画既高质量又高效打包。

# Input types
## Required
- images
    - ‘images’参数至关重要，因为它定义了将被编译成动画PNG的图像序列。它直接影响最终输出，决定了动画的内容和质量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- fps
    - ‘fps’参数决定了动画播放的速度，以每秒多少帧来衡量。它是设置动画节奏和确保流畅观看体验的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- compress_level
    - ‘compress_level’参数调整PNG文件的压缩级别，这有助于平衡文件大小与图像质量。这对于优化存储和加载时间非常重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- filename_prefix
    - ‘filename_prefix’参数允许用户为输出文件名指定自定义前缀，这对于组织和识别保存的动画非常有用。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt
    - ‘prompt’参数用于存储与正在保存的图像相关的附加上下文或描述。它可以为将来的参考或元数据目的提供有价值的信息。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - ‘extra_pnginfo’参数允许在PNG文件中包含额外的元数据，这可以用来嵌入自定义数据或注释。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, str]

# Output types
- ui
    - ‘ui’参数封装了节点操作生成的用户界面元素。它包括文件名和子文件夹等详细信息，这些对于用户定位和与保存的动画交互至关重要。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SaveAnimatedPNG:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = 'output'
        self.prefix_append = ''

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'filename_prefix': ('STRING', {'default': 'ComfyUI'}), 'fps': ('FLOAT', {'default': 6.0, 'min': 0.01, 'max': 1000.0, 'step': 0.01}), 'compress_level': ('INT', {'default': 4, 'min': 0, 'max': 9})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save_images'
    OUTPUT_NODE = True
    CATEGORY = 'image/animation'

    def save_images(self, images, fps, compress_level, filename_prefix='ComfyUI', prompt=None, extra_pnginfo=None):
        filename_prefix += self.prefix_append
        (full_output_folder, filename, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        pil_images = []
        for image in images:
            i = 255.0 * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            pil_images.append(img)
        metadata = None
        if not args.disable_metadata:
            metadata = PngInfo()
            if prompt is not None:
                metadata.add(b'comf', 'prompt'.encode('latin-1', 'strict') + b'\x00' + json.dumps(prompt).encode('latin-1', 'strict'), after_idat=True)
            if extra_pnginfo is not None:
                for x in extra_pnginfo:
                    metadata.add(b'comf', x.encode('latin-1', 'strict') + b'\x00' + json.dumps(extra_pnginfo[x]).encode('latin-1', 'strict'), after_idat=True)
        file = f'{filename}_{counter:05}_.png'
        pil_images[0].save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=compress_level, save_all=True, duration=int(1000.0 / fps), append_images=pil_images[1:])
        results.append({'filename': file, 'subfolder': subfolder, 'type': self.type})
        return {'ui': {'images': results, 'animated': (True,)}}
```