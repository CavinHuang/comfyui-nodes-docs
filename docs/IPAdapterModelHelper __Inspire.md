
# Documentation
- Class name: IPAdapterModelHelper __Inspire
- Category: InspirePack/models
- Output node: False

IPAdapterModelHelper节点旨在促进Inspire包中各种模型的集成和管理，确保兼容性和最佳性能。它负责动态加载模型、错误检查，以及应用IPAdapter配置以增强模型的互操作性和功能。

# Input types
## Required
- model
    - 将要应用IPAdapter配置的主要模型。这个参数对于定义将被IPAdapter增强或修改的基础模型至关重要。
    - Comfy dtype: MODEL
    - Python dtype: str
- clip
    - 指定与主模型一起使用的CLIP模型，以增强性能和兼容性。
    - Comfy dtype: CLIP
    - Python dtype: str
- preset
    - 定义模型设置的预设配置，决定要加载和应用哪些模型和设置。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora_strength_model
    - 调整应用于模型的LoRA修改的强度，允许对模型的行为进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_strength_clip
    - 调整应用于CLIP模型的LoRA修改的强度，能够精确控制其与主模型的集成。
    - Comfy dtype: FLOAT
    - Python dtype: float
- insightface_provider
    - 指定InsightFace模型的提供者，该模型用于面部识别和增强任务。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- cache_mode
    - 决定模型的缓存策略，特别影响InsightFace模型的缓存和使用方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- IPADAPTER_PIPE
    - 包含IPAdapter和其他模型的管道配置，准备就绪可以进行处理。
    - Comfy dtype: IPADAPTER_PIPE
    - Python dtype: tuple
- IPADAPTER
    - 加载的IPAdapter模型，准备应用于主模型。
    - Comfy dtype: IPADAPTER
    - Python dtype: object
- CLIP_VISION
    - 加载并配置用于管道内的CLIP视觉模型。
    - Comfy dtype: CLIP_VISION
    - Python dtype: object
- INSIGHTFACE
    - 加载用于面部识别和增强任务的InsightFace模型。
    - Comfy dtype: INSIGHTFACE
    - Python dtype: object
- MODEL
    - 应用了IPAdapter配置的增强模型，准备在管道中进一步使用。
    - Comfy dtype: MODEL
    - Python dtype: object
- CLIP
    - 加载并配置用于管道内文本-图像任务的CLIP模型。
    - Comfy dtype: CLIP
    - Python dtype: object
- insightface_cache_key
    - InsightFace模型的缓存键，用于缓存和检索目的。
    - Comfy dtype: STRING
    - Python dtype: str
- clip_vision_cache_key
    - CLIP视觉模型的缓存键，便于高效缓存和访问。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterModelHelper:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "clip": ("CLIP",),
                "preset": (list(model_preset.keys()),),
                "lora_strength_model": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
                "lora_strength_clip": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
                "insightface_provider": (["CPU", "CUDA", "ROCM"], ),
                "cache_mode": (["insightface only", "clip_vision only", "all", "none"], {"default": "insightface only"}),
            },
            "hidden": {"unique_id": "UNIQUE_ID"}
        }

    RETURN_TYPES = ("IPADAPTER_PIPE", "IPADAPTER", "CLIP_VISION", "INSIGHTFACE", "MODEL", "CLIP", "STRING", "STRING")
    RETURN_NAMES = ("IPADAPTER_PIPE", "IPADAPTER", "CLIP_VISION", "INSIGHTFACE", "MODEL", "CLIP", "insightface_cache_key", "clip_vision_cache_key")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/models"

    def doit(self, model, clip, preset, lora_strength_model, lora_strength_clip, insightface_provider, cache_mode="none", unique_id=None):
        if 'IPAdapter' not in nodes.NODE_CLASS_MAPPINGS:
            utils.try_install_custom_node('https://github.com/cubiq/ComfyUI_IPAdapter_plus',
                                          "To use 'IPAdapterModelHelper' node, 'ComfyUI IPAdapter Plus' extension is required.")
            raise Exception(f"[ERROR] To use IPAdapterModelHelper, you need to install 'ComfyUI IPAdapter Plus'")

        is_sdxl_preset = 'SDXL' in preset
        is_sdxl_model = isinstance(clip.tokenizer, sdxl_clip.SDXLTokenizer)

        if is_sdxl_preset != is_sdxl_model:
            server.PromptServer.instance.send_sync("inspire-node-output-label", {"node_id": unique_id, "output_idx": 1, "label": "IPADAPTER (fail)"})
            server.PromptServer.instance.send_sync("inspire-node-output-label", {"node_id": unique_id, "output_idx": 2, "label": "CLIP_VISION (fail)"})
            server.PromptServer.instance.send_sync("inspire-node-output-label", {"node_id": unique_id, "output_idx": 3, "label": "INSIGHTFACE (fail)"})
            server.PromptServer.instance.send_sync("inspire-node-output-label", {"node_id": unique_id, "output_idx": 4, "label": "MODEL (fail)"})
            server.PromptServer.instance.send_sync("inspire-node-output-label", {"node_id": unique_id, "output_idx": 5, "label": "CLIP (fail)"})
            print(f"[ERROR] IPAdapterModelHelper: You cannot mix SDXL and SD1.5 in the checkpoint and IPAdapter.")
            raise Exception("[ERROR] You cannot mix SDXL and SD1.5 in the checkpoint and IPAdapter.")

        ipadapter, clipvision, lora, is_insightface = model_preset[preset]

        ipadapter, ok1 = lookup_model("ipadapter", ipadapter)
        clipvision, ok2 = lookup_model("clip_vision", clipvision)
        lora, ok3 = lookup_model("loras", lora)

        if ok1 == "OK":
            ok1 = "IPADAPTER"
        else:
            ok1 = f"IPADAPTER ({ok1})"

        if ok2 == "OK":
            ok2 = "CLIP_VISION"
        else:
            ok2 = f"CLIP_VISION ({ok2})"

        server.PromptServer.instance.send_sync("inspire-node-output-label", {"node_id": unique_id, "output_idx": 1, "label": ok1})
        server.PromptServer.instance.send_sync("inspire-node-output-label", {"node_id": unique_id, "output_idx": 2, "label": ok2})

        if ok3 == "FAIL":
            server.PromptServer.instance.send_sync("inspire-node-output-label", {"node_id": unique_id, "output_idx": 4, "label": "MODEL (fail)"})
            server.PromptServer.instance.send_sync("inspire-node-output-label", {"node_id": unique_id, "output_idx": 5, "label": "CLIP (fail)"})
        else:
            server.PromptServer.instance.send_sync("inspire-node-output-label", {"node_id": unique_id, "output_idx": 4, "label": "MODEL"})
            server.PromptServer.instance.send_sync("inspire-node-output-label", {"node_id": unique_id, "output_idx": 5, "label": "CLIP"})

        if ok1 == "FAIL" or ok2 == "FAIL" or ok3 == "FAIL":
            raise Exception("ERROR: Failed to load several models in IPAdapterModelHelper.")

        if ipadapter is not None:
            ipadapter = nodes.NODE_CLASS_MAPPINGS["IPAdapterModelLoader"]().load_ipadapter_model(ipadapter_file=ipadapter)[0]

        ccache_key = ""
        if clipvision is not None:
            if cache_mode in ["clip_vision only", "all"]:
                ccache_key = clipvision
                if ccache_key not in backend_support.cache:
                    backend_support.update_cache(ccache_key, "clipvision", (False, nodes.CLIPVisionLoader().load_clip(clip_name=clipvision)[0]))
                _, (_, clipvision) = backend_support.cache[ccache_key]
            else:
                clipvision = nodes.CLIPVisionLoader().load_clip(clip_name=clipvision)[0]

        if lora is not None:
            model, clip = nodes.LoraLoader().load_lora(model=model, clip=clip, lora_name=lora, strength_model=lora_strength_model, strength_clip=lora_strength_clip)

            def f(x):
                return nodes.LoraLoader().load_lora(model=x, clip=clip, lora_name=lora, strength_model=lora_strength_model, strength_clip=lora_strength_clip)
            lora_loader = f
        else:
            def f(x):
                return x
            lora_loader = f

        if 'IPAdapterInsightFaceLoader' in nodes.NODE_CLASS_MAPPINGS:
            insight_face_loader = nodes.NODE_CLASS_MAPPINGS['IPAdapterInsightFaceLoader']().load_insightface
        else:
            print("'ComfyUI IPAdapter Plus' extension is either too outdated or not installed.")
            insight_face_loader = None

        icache_key = ""
        if is_insightface:
            if insight_face_loader is None:
                raise Exception(f"[ERROR] 'ComfyUI IPAdapter Plus' extension is either too outdated or not installed.")

            if cache_mode in ["insightface only", "all"]:
                icache_key = 'insightface-' + insightface_provider
                if icache_key not in backend_support.cache:
                    backend_support.update_cache(icache_key, "insightface", (False, insight_face_loader(insightface_provider)[0]))
                _, (_, insightface) = backend_support.cache[icache_key]
            else:
                insightface = insight_face_loader(insightface_provider)[0]

            server.PromptServer.instance.send_sync("inspire-node-output-label", {"node_id": unique_id, "output_idx": 3, "label": "INSIGHTFACE"})
        else:
            insightface = None
            server.PromptServer.instance.send_sync("inspire-node-output-label", {"node_id": unique_id, "output_idx": 3, "label": "INSIGHTFACE (N/A)"})

        pipe = ipadapter, model, clipvision, insightface, lora_loader
        return pipe, ipadapter, clipvision, insightface, model, clip, icache_key, ccache_key

```
