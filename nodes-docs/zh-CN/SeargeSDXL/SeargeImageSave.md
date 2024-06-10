# Documentation
- Class name: SeargeImageSave
- Category: Searge/_deprecated_/Files
- Output node: True
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点旨在方便图像数据的保存，确保图像以相关的元数据和命名约定正确存储。

# Input types
## Required
- images
    - 需要被节点保存的输入图像。这些图像是节点操作的主要数据，它们的质量和格式直接影响输出结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- filename_prefix
    - 用于构建保存图像文件名的前缀字符串。该参数至关重要，因为它决定了保存文件的身份和组织。
    - Comfy dtype: STRING
    - Python dtype: str
- state
    - 影响节点执行的状态参数。它决定了节点是否执行保存操作。
    - Comfy dtype: ENABLE_STATE
    - Python dtype: int
- save_to
    - 该参数规定了保存图像的目的地文件夹。它对于组织输出和确保图像在后处理后可访问至关重要。
    - Comfy dtype: SAVE_FOLDER
    - Python dtype: int
## Optional
- prompt
    - 这是一个可选参数，提供后，将在图像元数据中包含提示文本。这为图像添加了上下文，可能对以后的参考有用。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - 要与图像一起保存的额外元数据。该参数允许包含额外信息，可以丰富保存图像的上下文和实用性。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, str]

# Output types

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeImageSave:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'filename_prefix': ('STRING', {'default': 'SeargeSDXL-%date%/Image'}), 'state': ('ENABLE_STATE', {'default': SeargeParameterProcessor.STATES[1]}), 'save_to': ('SAVE_FOLDER', {'default': SeargeParameterProcessor.SAVE_TO[0]})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save_images'
    OUTPUT_NODE = True
    CATEGORY = 'Searge/_deprecated_/Files'

    def save_images(self, images, filename_prefix, state, save_to, prompt=None, extra_pnginfo=None):
        if state == SeargeParameterProcessor.STATES[0]:
            return {}
        if save_to == SeargeParameterProcessor.SAVE_TO[1]:
            output_dir = folder_paths.get_input_directory()
            filename_prefix = 'output-%date%'
        else:
            output_dir = folder_paths.get_output_directory()
        filename_prefix = filename_prefix.replace('%date%', datetime.now().strftime('%Y-%m-%d'))
        (full_output_folder, filename, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path(filename_prefix, output_dir, images[0].shape[1], images[0].shape[0])
        for image in images:
            i = 255.0 * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            metadata = None
            if args.disable_metadata is None or not args.disable_metadata:
                metadata = PngInfo()
                if prompt is not None:
                    metadata.add_text('prompt', json.dumps(prompt))
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
            file = f'{filename}_{counter:05}_.png'
            img.save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=4)
            counter += 1
        return {}
```