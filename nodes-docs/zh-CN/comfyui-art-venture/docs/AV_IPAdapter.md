
# Documentation
- Class name: AV_IPAdapter
- Category: Art Venture/IP Adapter
- Output node: False

AV_IPAdapter节点旨在将IP Adapter模型集成并应用于Art Venture框架中的图像。它通过利用IP Adapter和CLIP视觉模型来促进图像的增强或改变，允许基于指定参数和选项来定制视觉内容。

# Input types
## Required
- ip_adapter_name
    - 指定要使用的IP Adapter模型的名称。这个参数对于选择适当的图像处理模型至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- clip_name
    - 确定要与IP Adapter模型一起使用的CLIP视觉模型。这个参数对于将两个模型结合应用于图像至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- model
    - 应用IP Adapter之前的初始模型状态。这个参数代表了适应过程的起点。
    - Comfy dtype: MODEL
    - Python dtype: object
- image
    - 将要应用IP Adapter和CLIP视觉模型的图像。这个参数是节点功能的核心，作为适应过程的输入。
    - Comfy dtype: IMAGE
    - Python dtype: object
- weight
    - 控制IP Adapter对图像的影响。这个参数调整适应效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise
    - 调整适应过程中引入的噪声水平。这个参数可用于微调视觉输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- ip_adapter_opt
    - IP Adapter模型的可选配置。这个参数允许进一步自定义适应过程。
    - Comfy dtype: IPADAPTER
    - Python dtype: dict
- clip_vision_opt
    - CLIP视觉模型的可选配置。这个参数允许对CLIP模型的应用方式进行额外调整。
    - Comfy dtype: CLIP_VISION
    - Python dtype: dict
- attn_mask
    - 一个可选的掩码，可以在适应过程中应用，允许进行有针对性的修改。
    - Comfy dtype: MASK
    - Python dtype: object
- start_at
    - 定义IP Adapter应用效果的起始点，实现对图像的分阶段集成。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - 指定IP Adapter效果的结束点，允许适应效果逐渐消失。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - 确定应用于适应效果的权重类型，提供标准、提示重要性或风格转移的选项。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- enabled
    - 切换IP Adapter和CLIP视觉模型的应用。当设置为false时，适应过程被跳过。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- model
    - 应用IP Adapter后的模型，反映了对图像所做的修改。
    - Comfy dtype: MODEL
    - Python dtype: object
- pipeline
    - 包含适应过程中使用的IP Adapter和CLIP视觉模型的字典。这个输出提供了对模型配置的洞察。
    - Comfy dtype: IPADAPTER
    - Python dtype: dict
- clip_vision
    - 适应过程中应用的特定CLIP视觉模型。这个输出突出了CLIP视觉在图像转换中的作用。
    - Comfy dtype: CLIP_VISION
    - Python dtype: object


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler (Efficient).md)



## Source code
```python
    class AV_IPAdapter(IPAdapterModelLoader, IPAdapterApply):
        @classmethod
        def INPUT_TYPES(cls):
            return {
                "required": {
                    "ip_adapter_name": (["None"] + folder_paths.get_filename_list("ipadapter"),),
                    "clip_name": (["None"] + folder_paths.get_filename_list("clip_vision"),),
                    "model": ("MODEL",),
                    "image": ("IMAGE",),
                    "weight": ("FLOAT", {"default": 1.0, "min": -1, "max": 3, "step": 0.05}),
                    "noise": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                },
                "optional": {
                    "ip_adapter_opt": ("IPADAPTER",),
                    "clip_vision_opt": ("CLIP_VISION",),
                    "attn_mask": ("MASK",),
                    "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                    "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                    "weight_type": (
                        ["standard", "prompt is more important", "style transfer (SDXL only)"],
                        {"default": "standard"},
                    ),
                    "enabled": ("BOOLEAN", {"default": True}),
                },
            }

        RETURN_TYPES = ("MODEL", "IPADAPTER", "CLIP_VISION")
        RETURN_NAMES = ("model", "pipeline", "clip_vision")
        CATEGORY = "Art Venture/IP Adapter"
        FUNCTION = "apply_ip_adapter"

        def apply_ip_adapter(
            self,
            ip_adapter_name,
            clip_name,
            model,
            image,
            weight,
            noise,
            ip_adapter_opt=None,
            clip_vision_opt=None,
            enabled=True,
            **kwargs,
        ):
            if not enabled:
                return (model, None, None)

            if ip_adapter_opt:
                if "ipadapter" in ip_adapter_opt:
                    ip_adapter = ip_adapter_opt["ipadapter"]["model"]
                else:
                    ip_adapter = ip_adapter_opt
            else:
                assert ip_adapter_name != "None", "IP Adapter name must be specified"
                ip_adapter = loader.load_ipadapter_model(ip_adapter_name)[0]

            if clip_vision_opt:
                clip_vision = clip_vision_opt
            elif ip_adapter_opt and "clipvision" in ip_adapter_opt:
                clip_vision = ip_adapter_opt["clipvision"]["model"]
            else:
                assert clip_name != "None", "Clip vision name must be specified"
                clip_path = folder_paths.get_full_path("clip_vision", clip_name)
                clip_vision = comfy.clip_vision.load(clip_path)

            pipeline = {"ipadapter": {"model": ip_adapter}, "clipvision": {"model": clip_vision}}

            res: Tuple = apply.apply_ipadapter(model, pipeline, image=image, weight=weight, **kwargs)
            res += (pipeline, clip_vision)

            return res

```
