
# Documentation
- Class name: PreviewLatentAdvanced
- Category: latent
- Output node: True

PreviewLatentAdvanced节点是一个设计用于高级潜在图像预览生成的功能模块。它允许用户自定义基础模型、预览方法，并包含额外的元数据。该节点作为生成潜在图像预览的基础组件，提供了更高的灵活性和对预览生成过程的精细控制。

# Input types
## Required
- latent
    - 这是需要预览的图像的潜在表示。它是生成图像预览的关键组成部分。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- base_model
    - 指定用于预览生成的基础模型，提供'SD15'和'SDXL'两种选项，以调整预览质量和特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- preview_method
    - 决定将潜在表示转换为图像预览的方法，选项包括'auto'、'taesd'和'latent2rgb'，可以生成不同风格的预览。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- latent
    - 返回图像的潜在表示，保持与输入的一致性，同时可能包含预览过程中的潜在修改。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


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
