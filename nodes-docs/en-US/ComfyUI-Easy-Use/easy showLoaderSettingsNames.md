---
tags:
- Loader
---

# Show Loader Settings Names
## Documentation
- Class name: `easy showLoaderSettingsNames`
- Category: `EasyUse/Util`
- Output node: `True`

This node is designed to display the names of various loader settings, providing a straightforward way for users to understand and interact with the configuration options available for data loading processes.
## Input types
### Required
- **`pipe`**
    - Represents the pipeline configuration, crucial for determining the loader settings to be displayed.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
- **`names`**
    - Optional parameter allowing the specification of additional information or constraints on the names to be displayed.
    - Comfy dtype: `INFO`
    - Python dtype: `Union[str, Dict[str, Any]]`
## Output types
- **`ckpt_name`**
    - Comfy dtype: `STRING`
    - The name of the checkpoint file as determined by the loader settings.
    - Python dtype: `str`
- **`vae_name`**
    - Comfy dtype: `STRING`
    - The name of the VAE model file as determined by the loader settings.
    - Python dtype: `str`
- **`lora_name`**
    - Comfy dtype: `STRING`
    - The name of the LoRA model file as determined by the loader settings.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class showLoaderSettingsNames:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pipe": ("PIPE_LINE",),
                "names": ("INFO", {"default": '', "forceInput": False}),
            },
            "hidden": {
                "unique_id": "UNIQUE_ID",
                "extra_pnginfo": "EXTRA_PNGINFO",
            },
        }

    RETURN_TYPES = ("STRING", "STRING", "STRING",)
    RETURN_NAMES = ("ckpt_name", "vae_name", "lora_name")

    FUNCTION = "notify"
    OUTPUT_NODE = True

    CATEGORY = "EasyUse/Util"

    def notify(self, pipe, names=None, unique_id=None, extra_pnginfo=None):
        if unique_id and extra_pnginfo and "workflow" in extra_pnginfo:
            workflow = extra_pnginfo["workflow"]
            node = next((x for x in workflow["nodes"] if str(x["id"]) == unique_id), None)
            if node:
                ckpt_name = pipe['loader_settings']['ckpt_name'] if 'ckpt_name' in pipe['loader_settings'] else ''
                vae_name = pipe['loader_settings']['vae_name'] if 'vae_name' in pipe['loader_settings'] else ''
                lora_name = pipe['loader_settings']['lora_name'] if 'lora_name' in pipe['loader_settings'] else ''

                if ckpt_name:
                    ckpt_name = os.path.basename(os.path.splitext(ckpt_name)[0])
                if vae_name:
                    vae_name = os.path.basename(os.path.splitext(vae_name)[0])
                if lora_name:
                    lora_name = os.path.basename(os.path.splitext(lora_name)[0])

                names = "ckpt_name: " + ckpt_name + '\n' + "vae_name: " + vae_name + '\n' + "lora_name: " + lora_name
                node["widgets_values"] = names

        return {"ui": {"text": names}, "result": (ckpt_name, vae_name, lora_name)}

```
