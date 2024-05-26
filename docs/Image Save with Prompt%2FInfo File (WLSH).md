# Documentation
- Class name: WLSH_Image_Save_With_File_Info
- Category: WLSH Nodes/IO
- Output node: True
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_Image_Save_With_File_Info 节点旨在将图片保存到文件系统，并附加文件信息。它提供保存图片的功能，允许自定义文件名、扩展名和质量设置，并能够包含元数据，如提示和模型信息。

# Input types
## Required
- images
    - 图片参数对于节点至关重要，因为它定义了需要保存的输入图片。节点根据提供的其他参数处理并保存这些图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- filename
    - 文件名参数允许用户为保存的文件指定一个基本名称。它在组织输出文件中起着重要作用，因为它决定了文件名的初始部分。
    - Comfy dtype: STRING
    - Python dtype: str
- path
    - 路径参数决定了将保存图片的目录。它对于将保存的文件组织到特定文件夹中很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- extension
    - 扩展名参数决定了图片将被保存的文件格式。它对于定义输出图片要使用的文件扩展类型至关重要。
    - Comfy dtype: COMBO['png', 'jpeg', 'tiff', 'gif']
    - Python dtype: str
- quality
    - 质量参数对于设置保存图片的压缩级别很重要，特别是对于像JPEG或WebP这样的格式，它影响图片质量和文件大小之间的平衡。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- ui
    - 输出中的 ui 参数包含保存图片的路径，为用户提供了图片存储位置的参考。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, List[Dict[str, str]]]

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Image_Save_With_File_Info:

    def __init__(self):
        self.output_dir = folder_paths.output_directory
        self.type = 'output'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'filename': ('STRING', {'default': f'%time_%seed', 'multiline': False}), 'path': ('STRING', {'default': '', 'multiline': False}), 'extension': (['png', 'jpeg', 'tiff', 'gif'],), 'quality': ('INT', {'default': 100, 'min': 1, 'max': 100, 'step': 1})}, 'optional': {'positive': ('STRING', {'default': '', 'multiline': True, 'forceInput': True}), 'negative': ('STRING', {'default': '', 'multiline': True, 'forceInput': True}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615, 'forceInput': True}), 'modelname': ('STRING', {'default': '', 'multiline': False, 'forceInput': True}), 'counter': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'time_format': ('STRING', {'default': '%Y-%m-%d-%H%M%S', 'multiline': False}), 'info': ('INFO',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save_files'
    OUTPUT_NODE = True
    CATEGORY = 'WLSH Nodes/IO'

    def save_files(self, images, positive='unknown', negative='unknown', seed=-1, modelname='unknown', info=None, counter=0, filename='', path='', time_format='%Y-%m-%d-%H%M%S', extension='png', quality=100, prompt=None, extra_pnginfo=None):
        filename = make_filename(filename, seed, modelname, counter, time_format)
        comment = make_comment(positive, negative, modelname, seed, info)
        output_path = os.path.join(self.output_dir, path)
        if output_path.strip() != '':
            if not os.path.exists(output_path.strip()):
                print(f"The path `{output_path.strip()}` specified doesn't exist! Creating directory.")
                os.makedirs(output_path, exist_ok=True)
        paths = self.save_images(images, output_path, path, filename, comment, extension, quality, prompt, extra_pnginfo)
        self.save_text_file(filename, output_path, comment, seed, modelname)
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

    def save_text_file(self, filename, output_path, comment='', seed=0, modelname=''):
        self.writeTextFile(os.path.join(output_path, filename + '.txt'), comment)
        return

    def writeTextFile(self, file, content):
        try:
            with open(file, 'w') as f:
                f.write(content)
        except OSError:
            print('Unable to save file `{file}`')
```