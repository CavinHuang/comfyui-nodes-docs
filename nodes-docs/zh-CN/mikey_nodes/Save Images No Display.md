# Documentation
- Class name: SaveImageNoDisplay
- Category: Mikey/Image
- Output node: True
- Repo Ref: https://github.com/bash-j/mikey_nodes

方法 'save_images_no_display' 旨在将一系列图像保存到指定目录，同时不显示这些图像。它负责将图像数据转换为适合保存的格式，应用元数据，并根据提供的参数以结构化的方式组织文件。

# Input types
## Required
- images
    - 参数 'images' 是必需的，因为它包含了需要保存的原始图像数据。它在决定节点执行过程中起着关键作用，因为它是图像保存过程的主要输入。
    - Comfy dtype: COMBO[torch.Tensor]
    - Python dtype: List[torch.Tensor]
- sub_directory
    - 参数 'sub_directory' 指定了输出目录中的子文件夹，图像将被保存在这个子文件夹中。这对于以结构化的方式组织保存的图像很重要。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- filename_text_1
    - 参数 'filename_text_1' 允许通过提供一段文本字符串来定制文件名，这段文本将被纳入保存文件的名称中。
    - Comfy dtype: str
    - Python dtype: Optional[str]
- extra_metadata
    - 参数 'extra_metadata' 用于向图像文件的元数据添加额外信息。这可以包括提供有关图像的上下文或详细信息的各种类型的数据。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Output types
- ui
    - 输出中的 'ui' 参数包含有关保存的图像的信息，包括它们的文件名和子文件夹。这个输出很重要，因为它提供了有关图像保存操作结果的反馈。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, List[Dict[str, Union[str, int, Dict[str, Any]]]]}

# Usage tips
- Infra type: CPU

# Source code
```
class SaveImageNoDisplay(SaveImagesMikeyML):

    def __init__(self):
        super().__init__()
    RETURN_TYPES = ()
    FUNCTION = 'save_images_no_display'
    OUTPUT_NODE = True
    CATEGORY = 'Mikey/Image'

    def save_images_no_display(self, images, sub_directory, filename_text_1, filename_text_2, filename_text_3, filename_separator, timestamp, counter_type, filename_text_1_pos, filename_text_2_pos, filename_text_3_pos, timestamp_pos, timestamp_type, counter_pos, extra_metadata, prompt=None, extra_pnginfo=None):
        self.save_images(images, sub_directory, filename_text_1, filename_text_2, filename_text_3, filename_separator, timestamp, counter_type, filename_text_1_pos, filename_text_2_pos, filename_text_3_pos, timestamp_pos, timestamp_type, counter_pos, extra_metadata, prompt, extra_pnginfo)
        return (None,)
```