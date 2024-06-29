---
tags:
- Latent
---

# Preview Latent (Advanced)
## Documentation
- Class name: `PreviewLatentAdvanced`
- Category: `latent`
- Output node: `True`

This node is designed for advanced latent image preview generation, allowing for customization of the base model, preview method, and inclusion of additional metadata. It serves as a foundational component for generating previews of latent images with enhanced flexibility and control over the preview generation process.
## Input types
### Required
- **`latent`**
    - The latent representation of an image to be previewed. It is a crucial component for generating the image preview.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`base_model`**
    - Specifies the base model to use for preview generation, offering options between 'SD15' and 'SDXL' to adjust the preview quality and characteristics.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`preview_method`**
    - Determines the method used for converting the latent representation to an image preview, with options including 'auto', 'taesd', and 'latent2rgb' for varied preview styles.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - Returns the latent representation of the image, maintaining consistency with the input while potentially incorporating modifications from the preview process.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PreviewLatentAdvanced:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                    {"latent": ("LATENT",),
                     "base_model": (["SD15","SDXL"],),
                     "preview_method": (["auto","taesd","latent2rgb"],),
                     },
                "hidden": {"prompt": "PROMPT",
                           "extra_pnginfo": "EXTRA_PNGINFO",
                           "my_unique_id": "UNIQUE_ID",},
                }

    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("latent",)
    OUTPUT_NODE = True
    FUNCTION = "lpreview"
    CATEGORY = "latent"

    def lpreview(self, latent, base_model, preview_method, prompt=None, extra_pnginfo=None, my_unique_id=None):
        previous_preview_method = args.preview_method
        if preview_method == "taesd":
            temp_previewer = latent_preview.LatentPreviewMethod.TAESD
        elif preview_method == "latent2rgb":
            temp_previewer = latent_preview.LatentPreviewMethod.Latent2RGB
        else:
            temp_previewer = latent_preview.LatentPreviewMethod.Auto

        results = list()

        try:
            args.preview_method=temp_previewer
            preview_format = "PNG"
            load_device=comfy.model_management.vae_offload_device()
            latent_format = {"SD15":latent_formats.SD15,
                             "SDXL":latent_formats.SDXL}[base_model]()

            result=[]
            for i in range(len(latent["samples"])):
                x=latent.copy()
                x["samples"] = latent["samples"][i:i+1].clone()
                x_sample = x["samples"]
                x_sample = x_sample /  {"SD15":6,"SDXL":7.5}[base_model]

                img = latent_preview.get_previewer(load_device, latent_format).decode_latent_to_preview(x_sample)
                full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path("",folder_paths.get_temp_directory(), img.height, img.width)
                metadata = None
                if not args.disable_metadata:
                    metadata = PngInfo()
                    if prompt is not None:
                        metadata.add_text("prompt", json.dumps(prompt))
                    if extra_pnginfo is not None:
                        for x in extra_pnginfo:
                            metadata.add_text(x, json.dumps(extra_pnginfo[x]))

                file = "latent_"+"".join(random.choice("0123456789") for x in range(8))+".png"
                img.save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=4)
                results.append({"filename": file, "subfolder": subfolder, "type": "temp"})

        finally:
            # Restore global changes
            args.preview_method=previous_preview_method

        return {"result": (latent,), "ui": { "images": results } }

```
