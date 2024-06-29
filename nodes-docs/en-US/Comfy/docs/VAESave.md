---
tags:
- VAE
---

# VAESave
## Documentation
- Class name: `VAESave`
- Category: `advanced/model_merging`
- Output node: `True`

The VAESave node is designed for saving VAE models along with their metadata, including prompts and additional PNG information, to a specified output directory. It encapsulates the functionality to serialize the model state and associated information into a file, facilitating the preservation and sharing of trained models.
## Input types
### Required
- **`vae`**
    - The VAE model to be saved. This parameter is crucial as it represents the model whose state is to be serialized and stored.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`filename_prefix`**
    - A prefix for the filename under which the model and its metadata will be saved. This allows for organized storage and easy retrieval of models.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class VAESave:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "vae": ("VAE",),
                              "filename_prefix": ("STRING", {"default": "vae/ComfyUI_vae"}),},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},}
    RETURN_TYPES = ()
    FUNCTION = "save"
    OUTPUT_NODE = True

    CATEGORY = "advanced/model_merging"

    def save(self, vae, filename_prefix, prompt=None, extra_pnginfo=None):
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir)
        prompt_info = ""
        if prompt is not None:
            prompt_info = json.dumps(prompt)

        metadata = {}
        if not args.disable_metadata:
            metadata["prompt"] = prompt_info
            if extra_pnginfo is not None:
                for x in extra_pnginfo:
                    metadata[x] = json.dumps(extra_pnginfo[x])

        output_checkpoint = f"{filename}_{counter:05}_.safetensors"
        output_checkpoint = os.path.join(full_output_folder, output_checkpoint)

        comfy.utils.save_torch_file(vae.get_sd(), output_checkpoint, metadata=metadata)
        return {}

```
