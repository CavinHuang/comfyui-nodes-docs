# Documentation
- Class name: SaveAnimatedWEBP
- Category: image/animation
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaveAnimatedWEBP节点的'save_images'方法旨在高效地将一系列图像保存为动画WEBP文件。它利用PIL库将图像转换为适合动画的格式，允许控制帧速率、无损压缩和质量设置。该节点在图像处理工作流的最终输出阶段扮演着关键角色，能够从一系列静态图像中创建动画视觉效果。

# Input types
## Required
- images
    - “images”参数对于节点至关重要，因为它定义了将保存为动画的输入图像。每个图像都构成了最终输出中的一个帧，影响着整个动画序列和其视觉质量。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- fps
    - “fps”参数决定了动画的帧速率，这是影响最终输出在运动感知方面的一个关键因素。它决定了帧的显示速度，影响着整个动画的流畅度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lossless
    - “lossless”参数对于控制保存图像时使用的压缩方法很重要。当设置为True时，它确保保存的动画保持最高质量，不会丢失图像数据。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- quality
    - “quality”参数影响保存动画中文件大小和图像质量之间的平衡。较高的值会得到更好的图像质量但文件大小也会增加，而较低的值则相反。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - “method”参数选择创建动画WEBP文件时使用的压缩算法。不同的方法提供不同程度的压缩效率和速度，影响最终文件大小和保存动画所需的时间。
    - Comfy dtype: COMBO[default, fastest, slowest]
    - Python dtype: Literal['default', 'fastest', 'slowest']
## Optional
- filename_prefix
    - “filename_prefix”参数非常重要，因为它决定了保存文件的命名约定，这对于组织和识别输出至关重要。它提供了一个基础名称，然后与一个唯一标识符结合以创建完整的文件名。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- ui
    - 输出中的'ui'参数是一个字典，包含保存的图像的详细信息，包括文件名和子文件夹。它作为节点生成的输出的记录，为用户提供了保存的动画文件的位置和性质的参考。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SaveAnimatedWEBP:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = 'output'
        self.prefix_append = ''
    methods = {'default': 4, 'fastest': 0, 'slowest': 6}

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'filename_prefix': ('STRING', {'default': 'ComfyUI'}), 'fps': ('FLOAT', {'default': 6.0, 'min': 0.01, 'max': 1000.0, 'step': 0.01}), 'lossless': ('BOOLEAN', {'default': True}), 'quality': ('INT', {'default': 80, 'min': 0, 'max': 100}), 'method': (list(s.methods.keys()),)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save_images'
    OUTPUT_NODE = True
    CATEGORY = 'image/animation'

    def save_images(self, images, fps, filename_prefix, lossless, quality, method, num_frames=0, prompt=None, extra_pnginfo=None):
        method = self.methods.get(method)
        filename_prefix += self.prefix_append
        (full_output_folder, filename, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        pil_images = []
        for image in images:
            i = 255.0 * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            pil_images.append(img)
        metadata = pil_images[0].getexif()
        if not args.disable_metadata:
            if prompt is not None:
                metadata[272] = 'prompt:{}'.format(json.dumps(prompt))
            if extra_pnginfo is not None:
                inital_exif = 271
                for x in extra_pnginfo:
                    metadata[inital_exif] = '{}:{}'.format(x, json.dumps(extra_pnginfo[x]))
                    inital_exif -= 1
        if num_frames == 0:
            num_frames = len(pil_images)
        c = len(pil_images)
        for i in range(0, c, num_frames):
            file = f'{filename}_{counter:05}_.webp'
            pil_images[i].save(os.path.join(full_output_folder, file), save_all=True, duration=int(1000.0 / fps), append_images=pil_images[i + 1:i + num_frames], exif=metadata, lossless=lossless, quality=quality, method=method)
            results.append({'filename': file, 'subfolder': subfolder, 'type': self.type})
            counter += 1
        animated = num_frames != 1
        return {'ui': {'images': results, 'animated': (animated,)}}
```