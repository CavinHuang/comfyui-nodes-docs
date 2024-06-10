# Documentation
- Class name: SaveImagesMikey
- Category: Mikey/Image
- Output node: True
- Repo Ref: https://github.com/bash-j/mikey_nodes

SaveImagesMikey节点旨在处理并保存一系列图像到指定目录。它处理图像数据的转换，以便保存，并可以将元数据（如提示和参数）纳入图像文件中，以供后续参考。该节点在管理图像生成任务的输出方面起着关键作用。

# Input types
## Required
- images
    - ‘images’参数至关重要，因为它代表了节点将处理和保存的输入图像。节点的功能围绕处理这些图像展开，使这个参数成为节点操作的基本部分。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- filename_prefix
    - ‘filename_prefix’参数允许用户为保存的图像文件指定前缀，这对于组织和识别文件非常有用。这个参数有助于定制输出文件的命名约定。
    - Comfy dtype: STRING
    - Python dtype: str
- parameters
    - ‘parameters’输入很重要，因为它使节点能够在保存的文件中包含有关图像生成过程的额外信息。这对于跟踪和记录图像创建条件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- positive_prompt
    - ‘positive_prompt’参数用于在图像文件的元数据中添加积极的创作方向。它有助于根据引导图像创作的提示对图像进行分类。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - ‘negative_prompt’参数用于在图像文件的元数据中包含创造性的限制，这对于理解图像生成过程中施加的限制很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt
    - ‘prompt’参数是隐藏的，但很重要，因为它提供了影响图像生成的上下文或描述。它用于向图像元数据添加相关信息，以供将来参考。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - ‘extra_pnginfo’参数用于将额外的特定于PNG的元数据包含在保存的图像文件中。这可以增强每个图像可用的信息，对于高级图像管理特别有用。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: str

# Output types
- ui
    - ‘ui’输出提供了保存的图像的结构化表示，包括它们的文件名和子文件夹。这个输出很重要，因为它允许轻松跟踪和管理保存的图像文件。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, List[Dict[str, Union[str, int]]]]

# Usage tips
- Infra type: CPU

# Source code
```
class SaveImagesMikey:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = 'output'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'positive_prompt': ('STRING', {'default': 'Positive Prompt'}), 'negative_prompt': ('STRING', {'default': 'Negative Prompt'}), 'filename_prefix': ('STRING', {'default': ''}), 'parameters': ('STRING', {'default': ''})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save_images'
    OUTPUT_NODE = True
    CATEGORY = 'Mikey/Image'

    def save_images(self, images, filename_prefix='', parameters='', prompt=None, extra_pnginfo=None, positive_prompt='', negative_prompt=''):
        filename_prefix = search_and_replace(filename_prefix, extra_pnginfo, prompt)
        (full_output_folder, filename, counter, subfolder, filename_prefix) = get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        for image in images:
            i = 255.0 * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            metadata = PngInfo()
            pos_trunc = ''
            if prompt is not None:
                metadata.add_text('prompt', json.dumps(prompt))
            if extra_pnginfo is not None:
                for x in extra_pnginfo:
                    if x == 'parameters':
                        text = extra_pnginfo[x].encode('utf-8').decode('utf-8')
                        metadata.add_text(x, text)
                    elif x == 'workflow':
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
                    elif x == 'prompt':
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
                    else:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x], ensure_ascii=False))
            if positive_prompt:
                metadata.add_text('positive_prompt', positive_prompt)
                clean_pos = re.sub('[^a-zA-Z0-9 ]', '', positive_prompt)
                pos_trunc = clean_pos.replace(' ', '_')[0:80]
            if negative_prompt:
                metadata.add_text('negative_prompt', negative_prompt)
            if filename_prefix != '':
                clean_filename_prefix = re.sub('[^a-zA-Z0-9 _-]', '', filename_prefix)
                metadata.add_text('filename_prefix', json.dumps(clean_filename_prefix, ensure_ascii=False))
                file = f'{clean_filename_prefix[:75]}_{counter:05}_.png'
            else:
                ts_str = datetime.datetime.now().strftime('%y%m%d%H%M%S')
                file = f'{ts_str}_{pos_trunc}_{filename}_{counter:05}_.png'
            if parameters:
                metadata.add_text('parameters', parameters)
            img.save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=4)
            results.append({'filename': file, 'subfolder': subfolder, 'type': self.type})
            counter += 1
        return {'ui': {'images': results}}
```