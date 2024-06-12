---
tags:
- IPAdapter
---

# AV_IPAdapterPipeline
## Documentation
- Class name: `AV_IPAdapterPipeline`
- Category: `Art Venture/IP Adapter`
- Output node: `False`

The AV_IPAdapterPipeline node is designed to load and configure IP adapter and clip vision models for use in art generation pipelines. It facilitates the integration of these models into a unified pipeline, enabling enhanced image processing and manipulation capabilities.
## Input types
### Required
- **`ip_adapter_name`**
    - Specifies the name of the IP adapter model to be loaded. This is crucial for identifying and loading the correct IP adapter model for the pipeline.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip_name`**
    - Determines the name of the clip vision model to be loaded. This is essential for fetching and integrating the appropriate clip vision model into the pipeline.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`p`**
    - Comfy dtype: `IPADAPTER`
    - unknown
    - Python dtype: `unknown`
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
