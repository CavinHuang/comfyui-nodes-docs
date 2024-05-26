# Documentation
- Class name: WLSH_Image_Save_With_Prompt
- Category: WLSH Nodes/IO
- Output node: True
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点旨在便于保存图像数据，并能够包含额外的提示和元数据，增强保存图像的组织和描述能力。

# Input types
## Required
- images
    - 图像参数是必需的，因为它提供了需要保存的原始图像数据。它直接影响节点保存图像的主要功能。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- filename
    - 文件名参数对于定义保存图像的基础名称至关重要。它在图像保存后的组织和检索中扮演了重要角色。
    - Comfy dtype: STRING
    - Python dtype: str
- extension
    - 扩展名参数决定了图像将被保存的文件格式，影响了保存图像的兼容性和可用性。
    - Comfy dtype: COMBO
    - Python dtype: ['png', 'jpeg', 'tiff', 'gif']
- quality
    - 质量参数在保存支持质量级别的格式（如JPEG）的图像时非常重要。它影响图像的压缩和文件大小。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- path
    - 路径参数指定了图像将被保存的目录。它对于组织文件结构和管理存储位置很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt
    - 提示参数允许将额外的上下文信息与图像一起保存，增强描述性元数据并有助于未来的参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- ui
    - ui输出提供了保存图像的结构化表示，包括它们的路径和其他相关的元数据，这对于保存后图像的管理和参考至关重要。
    - Comfy dtype: DICTIONARY
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Image_Save_With_Prompt:

    def __init__(self):
        self.type = 'output'
        self.output_dir = folder_paths.output_directory

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'filename': ('STRING', {'default': f'%time_%seed', 'multiline': False}), 'path': ('STRING', {'default': '', 'multiline': False}), 'extension': (['png', 'jpeg', 'tiff', 'gif'],), 'quality': ('INT', {'default': 100, 'min': 1, 'max': 100, 'step': 1})}, 'optional': {'positive': ('STRING', {'multiline': True, 'forceInput': True}), 'negative': ('STRING', {'multiline': True, 'forceInput': True}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615, 'forceInput': True}), 'modelname': ('STRING', {'default': '', 'multiline': False, 'forceInput': True}), 'counter': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'time_format': ('STRING', {'default': '%Y-%m-%d-%H%M%S', 'multiline': False})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save_files'
    OUTPUT_NODE = True
    CATEGORY = 'WLSH Nodes/IO'

    def save_files(self, images, positive='unknown', negative='unknown', seed=-1, modelname='unknown', counter=0, filename='', path='', time_format='%Y-%m-%d-%H%M%S', extension='png', quality=100, prompt=None, extra_pnginfo=None):
        filename = make_filename(filename, seed, modelname, counter, time_format)
        comment = make_comment(positive, negative, modelname, seed, info=None)
        output_path = os.path.join(self.output_dir, path)
        if output_path.strip() != '':
            if not os.path.exists(output_path.strip()):
                print(f"The path `{output_path.strip()}` specified doesn't exist! Creating directory.")
                os.makedirs(output_path, exist_ok=True)
        paths = self.save_images(images, output_path, path, filename, comment, extension, quality, prompt, extra_pnginfo)
        return {'ui': {'images': paths}}

    def save_images(self, images, output_path, path, filename_prefix='ComfyUI', comment='', extension='png', quality=100, prompt=None, extra_pnginfo=None):

        def map_filename(filename):
            prefix_len = len(filename_prefix)
            prefix = filename[:prefix_len + 1]
            try:
                digits = int(filename[prefix_len + 1:].split('_')[0])
            except:
                digits = 0
            return (digits, prefix)
        imgCount = 1
        paths = list()
        for image in images:
            i = 255.0 * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            metadata = PngInfo()
            if prompt is not None:
                metadata.add_text('prompt', json.dumps(prompt))
            if extra_pnginfo is not None:
                for x in extra_pnginfo:
                    metadata.add_text(x, json.dumps(extra_pnginfo[x]))
            metadata.add_text('parameters', comment)
            metadata.add_text('comment', comment)
            if images.size()[0] > 1:
                filename_prefix += '_{:02d}'.format(imgCount)
            file = f'{filename_prefix}.{extension}'
            if extension == 'png':
                img.save(os.path.join(output_path, file), comment=comment, pnginfo=metadata, optimize=True)
            elif extension == 'webp':
                img.save(os.path.join(output_path, file), quality=quality)
            elif extension == 'jpeg':
                img.save(os.path.join(output_path, file), quality=quality, comment=comment, optimize=True)
            elif extension == 'tiff':
                img.save(os.path.join(output_path, file), quality=quality, optimize=True)
            else:
                img.save(os.path.join(output_path, file))
            paths.append({'filename': file, 'subfolder': path, 'type': self.type})
            imgCount += 1
        return paths
```