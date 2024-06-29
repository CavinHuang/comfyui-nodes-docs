---
tags:
- IPAdapter
---

# IPAdapter Model Helper (Inspire)
## Documentation
- Class name: `IPAdapterModelHelper __Inspire`
- Category: `InspirePack/models`
- Output node: `False`

The IPAdapterModelHelper node is designed to facilitate the integration and management of various models within the Inspire pack, ensuring compatibility and optimal performance. It handles the dynamic loading of models, error checking, and the application of IPAdapter configurations to enhance model interoperability and functionality.
## Input types
### Required
- **`model`**
    - The primary model to which the IPAdapter configurations will be applied. This parameter is essential for defining the base model that will be enhanced or modified by the IPAdapter.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`clip`**
    - Specifies the CLIP model to be used in conjunction with the primary model for enhanced performance and compatibility.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`preset`**
    - Defines the preset configuration for the model setup, determining which models and settings are to be loaded and applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_strength_model`**
    - Adjusts the strength of the LoRA modifications applied to the model, allowing for fine-tuning of the model's behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_strength_clip`**
    - Adjusts the strength of the LoRA modifications applied to the CLIP model, enabling precise control over its integration with the primary model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`insightface_provider`**
    - Specifies the provider for the InsightFace model, which is used for facial recognition and enhancement tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cache_mode`**
    - Determines the caching strategy for models, particularly affecting how the InsightFace model is cached and utilized.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`IPADAPTER_PIPE`**
    - Comfy dtype: `IPADAPTER_PIPE`
    - A pipeline configuration that includes the IPAdapter and other models, ready for processing.
    - Python dtype: `tuple`
- **`IPADAPTER`**
    - Comfy dtype: `IPADAPTER`
    - The loaded IPAdapter model, prepared for application to the primary model.
    - Python dtype: `object`
- **`CLIP_VISION`**
    - Comfy dtype: `CLIP_VISION`
    - The CLIP vision model loaded and configured for use within the pipeline.
    - Python dtype: `object`
- **`INSIGHTFACE`**
    - Comfy dtype: `INSIGHTFACE`
    - The InsightFace model loaded for facial recognition and enhancement tasks.
    - Python dtype: `object`
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The enhanced model with IPAdapter configurations applied, ready for further use in the pipeline.
    - Python dtype: `object`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The CLIP model loaded and configured for text-image tasks within the pipeline.
    - Python dtype: `object`
- **`insightface_cache_key`**
    - Comfy dtype: `STRING`
    - The cache key for the InsightFace model, used for caching and retrieval purposes.
    - Python dtype: `str`
- **`clip_vision_cache_key`**
    - Comfy dtype: `STRING`
    - The cache key for the CLIP vision model, facilitating efficient caching and access.
    - Python dtype: `str`
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
