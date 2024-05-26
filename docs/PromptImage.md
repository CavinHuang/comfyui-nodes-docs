# Documentation
- Class name: PromptImage
- Category: ♾️Mixlab/Prompt
- Output node: True
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

PromptImage节点旨在根据文本提示处理和操作图像。它接收提示和图像作为输入，然后生成一系列受输入提示影响的图像输出。该节点具有将这些图像保存到指定目录的能力，为创意或分析目的提供了文本和图像处理之间的无缝集成。

# Input types
## Required
- prompts
    - ‘prompts’参数是节点的重要输入，因为它提供了指导图像处理的文本内容。每个提示与一组图像相关联，并影响最终输出。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- images
    - ‘images’参数是包含要处理的图像数据的基本输入。预计它是一个图像张量列表，节点将根据提供的提示对其进行操作。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- save_to_image
    - ‘save_to_image’参数决定是否应将处理后的图像保存到输出目录。它允许用户根据需要启用或禁用保存功能。
    - Comfy dtype: COMBO['enable', 'disable']
    - Python dtype: List[str]

# Output types
- ui
    - 输出中的‘ui’参数包含显示处理后的图像及其相关提示的用户界面元素。它为进一步交互或分析提供了一种结构化的方式来展示结果。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class PromptImage:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = 'output'
        self.prefix_append = 'PromptImage'
        self.compress_level = 4

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompts': ('STRING', {'multiline': True, 'default': '', 'dynamicPrompts': False}), 'images': ('IMAGE', {'default': None}), 'save_to_image': (['enable', 'disable'],)}}
    RETURN_TYPES = ()
    OUTPUT_NODE = True
    INPUT_IS_LIST = True
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Prompt'

    def run(self, prompts, images, save_to_image):
        filename_prefix = 'mixlab_'
        filename_prefix += self.prefix_append
        (full_output_folder, filename, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        save_to_image = save_to_image[0] == 'enable'
        for index in range(len(images)):
            res = []
            imgs = images[index]
            for image in imgs:
                img = tensor2pil(image)
                metadata = None
                if save_to_image:
                    metadata = PngInfo()
                    prompt_text = prompts[index]
                    if prompt_text is not None:
                        metadata.add_text('prompt_text', prompt_text)
                file = f'{filename}_{index}_{counter:05}_.png'
                img.save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=self.compress_level)
                res.append({'filename': file, 'subfolder': subfolder, 'type': self.type})
                counter += 1
            results.append(res)
        return {'ui': {'_images': results, 'prompts': prompts}}
```