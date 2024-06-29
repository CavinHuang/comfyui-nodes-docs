# Documentation
- Class name: SaveImage
- Category: image
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在将生成的图像持久化到文件系统中，确保图像创建过程的结果被存储并组织在用户指定的目录结构中。

# Input types
## Required
- images
    - 图像参数是必需的，因为它为节点提供了需要保存的原始图像数据。它直接影响节点保存图像的主要功能。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- filename_prefix
    - 此参数允许用户为保存的图像文件名指定前缀，这对于在输出目录中组织和识别图像至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- ui
    - 输出提供了保存图像的结构化摘要，包括文件名和子文件夹，这对于用户跟踪和管理生成的内容非常重要。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, List[Dict[str, Union[str, int]]]

# Usage tips
- Infra type: CPU

# Source code
```
class SaveImage:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = 'output'
        self.prefix_append = ''
        self.compress_level = 4

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'filename_prefix': ('STRING', {'default': 'ComfyUI'})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save_images'
    OUTPUT_NODE = True
    CATEGORY = 'image'

    def save_images(self, images, filename_prefix='ComfyUI', prompt=None, extra_pnginfo=None):
        filename_prefix += self.prefix_append
        (full_output_folder, filename, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        for (batch_number, image) in enumerate(images):
            i = 255.0 * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            metadata = None
            if not args.disable_metadata:
                metadata = PngInfo()
                if prompt is not None:
                    metadata.add_text('prompt', json.dumps(prompt))
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
            filename_with_batch_num = filename.replace('%batch_num%', str(batch_number))
            file = f'{filename_with_batch_num}_{counter:05}_.png'
            img.save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=self.compress_level)
            results.append({'filename': file, 'subfolder': subfolder, 'type': self.type})
            counter += 1
        return {'ui': {'images': results}}
```