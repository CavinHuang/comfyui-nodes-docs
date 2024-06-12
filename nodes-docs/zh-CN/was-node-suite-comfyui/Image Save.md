# Documentation
- Class name: WAS_Image_Save
- Category: WAS Suite/IO
- Output node: True
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Save节点负责将图片保存到指定的输出目录。它处理各种文件格式，并提供命名和组织保存图片的选项，确保了图像输出管理的流程化。

# Input types
## Required
- images
    - 图片参数是必需的，它定义了需要保存的输入图片。它在节点的执行中起着关键作用，因为它直接影响输出。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]
## Optional
- output_path
    - output_path参数指定了保存图片的目录。它在确定文件系统内保存文件的最终位置时非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- filename_prefix
    - filename_prefix用于为保存的图片创建一致的命名约定，这对于组织和识别文件非常有益。
    - Comfy dtype: STRING
    - Python dtype: str
- filename_delimiter
    - filename_delimiter是一个字符，用于在保存的图像文件名中分隔前缀和数字标识符。
    - Comfy dtype: STRING
    - Python dtype: str
- filename_number_padding
    - filename_number_padding参数确定文件名中用于数字标识符的位数，确保文件命名方案的一致性。
    - Comfy dtype: INT
    - Python dtype: int
- extension
    - extension参数指示图片将被保存的文件格式，允许产生不同类型的图片文件。
    - Comfy dtype: COMBO['png', 'jpg', 'jpeg', 'gif', 'tiff', 'webp', 'bmp']
    - Python dtype: str
- quality
    - quality参数用于设置保存图片的压缩级别，这可能会影响文件大小和图片质量之间的平衡。
    - Comfy dtype: INT
    - Python dtype: int
- lossless_webp
    - lossless_webp参数指定是否应使用无损压缩保存WEBP图片，这保留了更多的图像数据，但代价是文件大小更大。
    - Comfy dtype: COMBO[false, true]
    - Python dtype: bool
- overwrite_mode
    - overwrite_mode参数确定节点如何处理同名的现有文件，可以覆盖它们，或者使用文件名前缀作为新文件名的一部分。
    - Comfy dtype: COMBO[false, prefix_as_filename]
    - Python dtype: str
- show_history
    - show_history参数控制是否显示保存图片的历史记录，这对于查看过去的输出非常有用。
    - Comfy dtype: COMBO[false, true]
    - Python dtype: bool
- show_history_by_prefix
    - 当show_history_by_prefix参数为true时，它将显示的图片历史记录过滤为仅显示具有相同文件名前缀的图片，增强了组织性。
    - Comfy dtype: COMBO[true, false]
    - Python dtype: bool
- embed_workflow
    - embed_workflow参数指示是否应在图像文件中包含工作流元数据，提供有关图像创建过程的额外上下文和信息。
    - Comfy dtype: COMBO[true, false]
    - Python dtype: bool
- show_previews
    - show_previews参数决定保存后是否显示图片预览，提供了一种快速查看操作结果的方法。
    - Comfy dtype: COMBO[true, false]
    - Python dtype: bool

# Output types
- ui
    - ui参数包含保存图片后显示的用户界面元素，包括预览和历史记录（如果启用了这些选项）。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Union[List[Dict[str, Union[str, pathlib.Path]]], List[]]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Save:

    def __init__(self):
        self.output_dir = comfy_paths.output_directory
        self.type = 'output'

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'output_path': ('STRING', {'default': '[time(%Y-%m-%d)]', 'multiline': False}), 'filename_prefix': ('STRING', {'default': 'ComfyUI'}), 'filename_delimiter': ('STRING', {'default': '_'}), 'filename_number_padding': ('INT', {'default': 4, 'min': 1, 'max': 9, 'step': 1}), 'filename_number_start': (['false', 'true'],), 'extension': (['png', 'jpg', 'jpeg', 'gif', 'tiff', 'webp', 'bmp'],), 'quality': ('INT', {'default': 100, 'min': 1, 'max': 100, 'step': 1}), 'lossless_webp': (['false', 'true'],), 'overwrite_mode': (['false', 'prefix_as_filename'],), 'show_history': (['false', 'true'],), 'show_history_by_prefix': (['true', 'false'],), 'embed_workflow': (['true', 'false'],), 'show_previews': (['true', 'false'],)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'was_save_images'
    OUTPUT_NODE = True
    CATEGORY = 'WAS Suite/IO'

    def was_save_images(self, images, output_path='', filename_prefix='ComfyUI', filename_delimiter='_', extension='png', quality=100, lossless_webp='false', prompt=None, extra_pnginfo=None, overwrite_mode='false', filename_number_padding=4, filename_number_start='false', show_history='false', show_history_by_prefix='true', embed_workflow='true', show_previews='true'):
        delimiter = filename_delimiter
        number_padding = filename_number_padding
        lossless_webp = lossless_webp == 'true'
        tokens = TextTokens()
        original_output = self.output_dir
        filename_prefix = tokens.parseTokens(filename_prefix)
        if output_path in [None, '', 'none', '.']:
            output_path = self.output_dir
        else:
            output_path = tokens.parseTokens(output_path)
        if not os.path.isabs(output_path):
            output_path = os.path.join(self.output_dir, output_path)
        base_output = os.path.basename(output_path)
        if output_path.endswith('ComfyUI/output') or output_path.endswith('ComfyUI\\output'):
            base_output = ''
        if output_path.strip() != '':
            if not os.path.isabs(output_path):
                output_path = os.path.join(comfy_paths.output_directory, output_path)
            if not os.path.exists(output_path.strip()):
                cstr(f"The path `{output_path.strip()}` specified doesn't exist! Creating directory.").warning.print()
                os.makedirs(output_path, exist_ok=True)
        if filename_number_start == 'true':
            pattern = f'(\\d+){re.escape(delimiter)}{re.escape(filename_prefix)}'
        else:
            pattern = f'{re.escape(filename_prefix)}{re.escape(delimiter)}(\\d+)'
        existing_counters = [int(re.search(pattern, filename).group(1)) for filename in os.listdir(output_path) if re.match(pattern, os.path.basename(filename))]
        existing_counters.sort(reverse=True)
        if existing_counters:
            counter = existing_counters[0] + 1
        else:
            counter = 1
        if existing_counters:
            counter = existing_counters[0] + 1
        else:
            counter = 1
        file_extension = '.' + extension
        if file_extension not in ALLOWED_EXT:
            cstr(f"The extension `{extension}` is not valid. The valid formats are: {', '.join(sorted(ALLOWED_EXT))}").error.print()
            file_extension = 'png'
        results = list()
        for image in images:
            i = 255.0 * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            if extension == 'webp':
                img_exif = img.getexif()
                workflow_metadata = ''
                prompt_str = ''
                if prompt is not None:
                    prompt_str = json.dumps(prompt)
                    img_exif[271] = 'Prompt:' + prompt_str
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        workflow_metadata += json.dumps(extra_pnginfo[x])
                img_exif[270] = 'Workflow:' + workflow_metadata
                exif_data = img_exif.tobytes()
            else:
                metadata = PngInfo()
                if embed_workflow == 'true':
                    if prompt is not None:
                        metadata.add_text('prompt', json.dumps(prompt))
                    if extra_pnginfo is not None:
                        for x in extra_pnginfo:
                            metadata.add_text(x, json.dumps(extra_pnginfo[x]))
                exif_data = metadata
            if overwrite_mode == 'prefix_as_filename':
                file = f'{filename_prefix}{file_extension}'
            else:
                if filename_number_start == 'true':
                    file = f'{counter:0{number_padding}}{delimiter}{filename_prefix}{file_extension}'
                else:
                    file = f'{filename_prefix}{delimiter}{counter:0{number_padding}}{file_extension}'
                if os.path.exists(os.path.join(output_path, file)):
                    counter += 1
            try:
                output_file = os.path.abspath(os.path.join(output_path, file))
                if extension in ['jpg', 'jpeg']:
                    img.save(output_file, quality=quality, optimize=True)
                elif extension == 'webp':
                    img.save(output_file, quality=quality, lossless=lossless_webp, exif=exif_data)
                elif extension == 'png':
                    img.save(output_file, pnginfo=exif_data, optimize=True)
                elif extension == 'bmp':
                    img.save(output_file)
                elif extension == 'tiff':
                    img.save(output_file, quality=quality, optimize=True)
                else:
                    img.save(output_file, pnginfo=exif_data, optimize=True)
                cstr(f'Image file saved to: {output_file}').msg.print()
                if show_history != 'true' and show_previews == 'true':
                    subfolder = self.get_subfolder_path(output_file, original_output)
                    results.append({'filename': file, 'subfolder': subfolder, 'type': self.type})
                update_history_output_images(output_file)
            except OSError as e:
                cstr(f'Unable to save file to: {output_file}').error.print()
                print(e)
            except Exception as e:
                cstr('Unable to save file due to the to the following error:').error.print()
                print(e)
            if overwrite_mode == 'false':
                counter += 1
        filtered_paths = []
        if show_history == 'true' and show_previews == 'true':
            HDB = WASDatabase(WAS_HISTORY_DATABASE)
            conf = getSuiteConfig()
            if HDB.catExists('History') and HDB.keyExists('History', 'Output_Images'):
                history_paths = HDB.get('History', 'Output_Images')
            else:
                history_paths = None
            if history_paths:
                for image_path in history_paths:
                    image_subdir = self.get_subfolder_path(image_path, self.output_dir)
                    current_subdir = self.get_subfolder_path(output_file, self.output_dir)
                    if not os.path.exists(image_path):
                        continue
                    if show_history_by_prefix == 'true' and image_subdir != current_subdir:
                        continue
                    if show_history_by_prefix == 'true' and (not os.path.basename(image_path).startswith(filename_prefix)):
                        continue
                    filtered_paths.append(image_path)
                if conf.__contains__('history_display_limit'):
                    filtered_paths = filtered_paths[-conf['history_display_limit']:]
                filtered_paths.reverse()
        if filtered_paths:
            for image_path in filtered_paths:
                subfolder = self.get_subfolder_path(image_path, self.output_dir)
                image_data = {'filename': os.path.basename(image_path), 'subfolder': subfolder, 'type': self.type}
                results.append(image_data)
        if show_previews == 'true':
            return {'ui': {'images': results}}
        else:
            return {'ui': {'images': []}}

    def get_subfolder_path(self, image_path, output_path):
        output_parts = output_path.strip(os.sep).split(os.sep)
        image_parts = image_path.strip(os.sep).split(os.sep)
        common_parts = os.path.commonprefix([output_parts, image_parts])
        subfolder_parts = image_parts[len(common_parts):]
        subfolder_path = os.sep.join(subfolder_parts[:-1])
        return subfolder_path
```