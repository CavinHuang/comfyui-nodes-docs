
# Documentation
- Class name: AV_IPAdapterPipeline
- Category: Art Venture/IP Adapter
- Output node: False

AV_IPAdapterPipeline节点旨在加载和配置IP适配器和剪辑视觉模型，以便在艺术生成管道中使用。它促进了这些模型在统一管道中的集成，从而实现增强的图像处理和操作能力。

# Input types
## Required
- ip_adapter_name
    - 指定要加载的IP适配器模型的名称。这对于识别和加载正确的IP适配器模型至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- clip_name
    - 确定要加载的剪辑视觉模型的名称。这对于获取和整合适当的剪辑视觉模型到管道中至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- p
    - 输出的p参数代表经过配置的IP适配器和剪辑视觉模型的集成管道。它封装了可用于后续艺术生成任务的处理能力。
    - Comfy dtype: IPADAPTER
    - Python dtype: unknown


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class AV_IPAdapterPipeline:
        @classmethod
        def INPUT_TYPES(cls):
            return {
                "required": {
                    "ip_adapter_name": (folder_paths.get_filename_list("ipadapter"),),
                    "clip_name": (folder_paths.get_filename_list("clip_vision"),),
                }
            }

        RETURN_TYPES = ("IPADAPTER",)
        RETURN_NAMES = "pipeline"
        CATEGORY = "Art Venture/IP Adapter"
        FUNCTION = "load_ip_adapter"

        def load_ip_adapter(ip_adapter_name, clip_name):
            ip_adapter = loader.load_ipadapter_model(ip_adapter_name)[0]

            clip_path = folder_paths.get_full_path("clip_vision", clip_name)
            clip_vision = comfy.clip_vision.load(clip_path)

            pipeline = {"ipadapter": {"model": ip_adapter}, "clipvision": {"model": clip_vision}}
            return pipeline

```
