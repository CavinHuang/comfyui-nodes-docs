# Documentation
- Class name: Send_To_Editor
- Category: image
- Output node: True
- Repo Ref: https://github.com/Lerc/canvas_tab.git

该节点旨在处理和收集图像数据，将其转换为适合进一步在编辑环境中使用的格式。它强调将原始图像输入转换为结构化的输出，以便可以无缝集成到各种编辑工具中。

# Input types
## Required
- unique_id
    - 图像批次的唯一标识符，确保在编辑过程中可以单独跟踪和管理每组图像。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- images
    - 将由节点处理的输入图像。这些图像至关重要，因为它们构成了输出的基础，并直接影响发送到编辑器的数据质量和可用性。
    - Comfy dtype: COMBO[Image]
    - Python dtype: List[PIL.Image.Image]

# Output types
- collected_images
    - 代表收集的图像的数据URL列表，准备在编辑界面中使用。
    - Comfy dtype: List[str]
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class Send_To_Editor:

    def __init__(self):
        self.updateTick = 1
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'hidden': {'unique_id': 'UNIQUE_ID'}, 'optional': {'images': ('IMAGE',)}}
    RETURN_TYPES = ()
    FUNCTION = 'collect_images'
    OUTPUT_NODE = True
    CATEGORY = 'image'

    def IS_CHANGED(self, unique_id, images):
        self.updateTick += 1
        return hex(self.updateTick)

    def collect_images(self, unique_id, images=None):
        collected_images = list()
        if images is not None:
            for image in images:
                i = 255.0 * image.cpu().numpy()
                img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
                collected_images.append(image_to_data_url(img))
        return {'ui': {'collected_images': collected_images}}
```