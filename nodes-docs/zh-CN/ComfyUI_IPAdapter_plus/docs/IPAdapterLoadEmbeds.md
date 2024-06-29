# Documentation
- Class name: IPAdapterLoadEmbeds
- Category: ipadapter/embeds
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterLoadEmbeds 节点的 `load` 方法旨在从指定文件中检索和处理嵌入数据。它是系统中处理嵌入数据的关键组件，确保嵌入数据被正确加载并为下游任务提供可用性。

# Input types
## Required
- embeds
    - 参数 'embeds' 是一个包含嵌入数据存储文件路径的列表。这个参数至关重要，因为它指导节点定位数据的正确位置，使得节点能够成功加载和处理嵌入数据。
    - Comfy dtype: List[str]
    - Python dtype: List[str]

# Output types
- EMBEDS
    - 输出参数 'EMBEDS' 表示加载的嵌入数据作为张量。这个张量非常重要，因为它是输入数据的加工形式，准备用于后续的分析或模型训练。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class IPAdapterLoadEmbeds:

    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [os.path.relpath(os.path.join(root, file), input_dir) for (root, dirs, files) in os.walk(input_dir) for file in files if file.endswith('.ipadpt')]
        return {'required': {'embeds': [sorted(files)]}}
    RETURN_TYPES = ('EMBEDS',)
    FUNCTION = 'load'
    CATEGORY = 'ipadapter/embeds'

    def load(self, embeds):
        path = folder_paths.get_annotated_filepath(embeds)
        return (torch.load(path).cpu(),)
```