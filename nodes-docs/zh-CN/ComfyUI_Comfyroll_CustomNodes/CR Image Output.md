# Documentation
- Class name: CR_ImageOutput
- Category: Comfyroll/Essential/Core
- Output node: True
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ImageOutput 是一个用于管理图像数据输出的节点，提供保存或预览图像的功能，并允许自定义文件命名和格式。它在图像处理工作流的最后阶段扮演着关键角色，确保结果易于访问且组织良好。

# Input types
## Required
- images
    - 'image' 参数至关重要，因为它定义了节点将处理的输入图像数据。它通过决定将保存或预览的内容来影响节点的执行。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- output_type
    - “output_type”参数决定节点是将图像保存到磁盘还是预览它们。它很重要，因为它将节点的主要功能引向任一输出方法。
    - Comfy dtype: COMBO['Preview', 'Save', 'UI (no batch)']
    - Python dtype: str
- file_format
    - “file_format”参数指定了图像将被保存的格式，影响输出文件的质量和兼容性。
    - Comfy dtype: COMBO['png', 'jpg', 'webp', 'tif']
    - Python dtype: str
## Optional
- filename_prefix
    - “filename_prefix”参数设置输出文件的基本名称，这对于组织和识别保存的图像很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- prefix_presets
    - “prefix_presets”允许在文件名前添加基于日期的前缀，这对于按时间顺序排序和归档很有用。
    - Comfy dtype: COMBO[None, 'yyyyMMdd']
    - Python dtype: str
- trigger
    - 当设置为 True 时，“trigger”参数在工作流中启动一个动作或信号，可能触发后续流程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- prompt
    - “prompt”参数用于存储与图像相关的描述或注释，这对于元数据目的很有帮助。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - “extra_pnginfo”参数允许在PNG文件中嵌入额外的元数据，增强与图像相关的信息。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]

# Output types
- ui
    - “ui”输出包含带有元数据的图像对象列表，这对于为用户界面提供已处理图像的必要视觉和上下文信息很重要。
    - Comfy dtype: COMBO[{'images': List[Dict[str, Any]]}]
    - Python dtype: Dict[str, Any]
- result
    - “result”输出表示节点操作的完成状态，并在需要时提供用于进一步帮助的 URL。
    - Comfy dtype: COMBO[Tuple[BOOLEAN, str]]
    - Python dtype: Tuple[bool, str]

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ImageOutput:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = 'output'

    @classmethod
    def INPUT_TYPES(cls):
        presets = ['None', 'yyyyMMdd']
        return {'required': {'images': ('IMAGE',), 'output_type': (['Preview', 'Save', 'UI (no batch)'],), 'filename_prefix': ('STRING', {'default': 'CR'}), 'prefix_presets': (presets,), 'file_format': (['png', 'jpg', 'webp', 'tif'],)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}, 'optional': {'trigger': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('BOOLEAN',)
    RETURN_NAMES = ('trigger',)
    FUNCTION = 'save_images'
    OUTPUT_NODE = True
    CATEGORY = icons.get('Comfyroll/Essential/Core')

    def save_images(self, images, file_format, prefix_presets, filename_prefix='CR', trigger=False, output_type='Preview', prompt=None, extra_pnginfo=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-image-output'

        def map_filename(filename):
            prefix_len = len(os.path.basename(filename_prefix))
            prefix = filename[:prefix_len + 1]
            try:
                digits = int(filename[prefix_len + 1:].split('_')[0])
            except:
                digits = 0
            return (digits, prefix)
        if output_type == 'Save':
            self.output_dir = folder_paths.get_output_directory()
            self.type = 'output'
        elif output_type == 'Preview':
            self.output_dir = folder_paths.get_temp_directory()
            self.type = 'temp'
        date_formats = {'yyyyMMdd': lambda d: '{}{:02d}{:02d}'.format(str(d.year), d.month, d.day)}
        current_datetime = datetime.datetime.now()
        for (format_key, format_lambda) in date_formats.items():
            preset_prefix = f'{format_lambda(current_datetime)}'
        if prefix_presets != 'None':
            filename_prefix = filename_prefix + '_' + preset_prefix
        if filename_prefix[0] == '_':
            filename_prefix = filename_prefix[1:]
        subfolder = os.path.dirname(os.path.normpath(filename_prefix))
        filename = os.path.basename(os.path.normpath(filename_prefix))
        full_output_folder = os.path.join(self.output_dir, subfolder)
        if os.path.commonpath((self.output_dir, os.path.abspath(full_output_folder))) != self.output_dir:
            return {}
        try:
            counter = max(filter(lambda a: a[1][:-1] == filename and a[1][-1] == '_', map(map_filename, os.listdir(full_output_folder))))[0] + 1
        except ValueError:
            counter = 1
        except FileNotFoundError:
            os.makedirs(full_output_folder, exist_ok=True)
            counter = 1
        if output_type == 'UI (no batch)':
            results = []
            for tensor in images:
                array = 255.0 * tensor.cpu().numpy()
                image = Image.fromarray(np.clip(array, 0, 255).astype(np.uint8))
                server = PromptServer.instance
                server.send_sync(BinaryEventTypes.UNENCODED_PREVIEW_IMAGE, ['PNG', image, None], server.client_id)
                results.append({'source': 'websocket', 'content-type': 'image/png', 'type': 'output'})
            return {'ui': {'images': results}}
        else:
            results = list()
            for image in images:
                i = 255.0 * image.cpu().numpy()
                img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
                metadata = PngInfo()
                if prompt is not None:
                    metadata.add_text('prompt', json.dumps(prompt))
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
                file_name = f'{filename}_{counter:05}_.{file_format}'
                img_params = {'png': {'compress_level': 4}, 'webp': {'method': 6, 'lossless': False, 'quality': 80}, 'jpg': {'format': 'JPEG'}, 'tif': {'format': 'TIFF'}}
                resolved_image_path = os.path.join(full_output_folder, file_name)
                img.save(resolved_image_path, **img_params[file_format], pnginfo=metadata)
                results.append({'filename': file_name, 'subfolder': subfolder, 'type': self.type})
                counter += 1
            return {'ui': {'images': results}, 'result': (trigger, show_help)}
```