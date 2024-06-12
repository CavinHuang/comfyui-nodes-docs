---
tags:
- Latent
---

# LatentSender
## Documentation
- Class name: `LatentSender`
- Category: `ImpactPack/Util`
- Output node: `True`

LatentSender is designed for handling and transmitting latent representations of images. It encapsulates the functionality to prepare a preview of the latent image, save the latent tensor along with metadata and a preview image to a file, and send the latent image information to a specified destination. This node facilitates the sharing and manipulation of latent image representations by providing a structured way to save and communicate these representations.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter represents the latent representations of images to be handled. It is crucial for the node's operation as it forms the basis of the latent image information that will be saved, previewed, and sent.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`filename_prefix`**
    - This parameter specifies the prefix for the filenames under which the latent images and their metadata will be saved. It plays a significant role in organizing the saved files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`link_id`**
    - The 'link_id' parameter is used to identify the specific destination or channel to which the latent image information will be sent. It is essential for routing the information correctly.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`preview_method`**
    - Specifies the method to be used for generating a preview of the latent image. This parameter affects how the latent representation is visualized before being saved or sent.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`ui`**
    - The output includes a UI component that displays the information about the saved latent images, including filenames and subfolders. This facilitates user interaction with the saved latent representations.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LatentSender(nodes.SaveLatent):
    def __init__(self):
        super().__init__()
        self.output_dir = folder_paths.get_temp_directory()
        self.type = "temp"

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                             "samples": ("LATENT", ),
                             "filename_prefix": ("STRING", {"default": "latents/LatentSender"}),
                             "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                             "preview_method": (["Latent2RGB-SDXL", "Latent2RGB-SD15", "TAESDXL", "TAESD15"],)
                             },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

    OUTPUT_NODE = True

    RETURN_TYPES = ()

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    @staticmethod
    def save_to_file(tensor_bytes, prompt, extra_pnginfo, image, image_path):
        compressed_data = BytesIO()
        with zipfile.ZipFile(compressed_data, mode='w') as archive:
            archive.writestr("latent", tensor_bytes)
        image = image.copy()
        exif_data = {"Exif": {piexif.ExifIFD.UserComment: compressed_data.getvalue()}}

        metadata = PngInfo()
        if prompt is not None:
            metadata.add_text("prompt", json.dumps(prompt))
        if extra_pnginfo is not None:
            for x in extra_pnginfo:
                metadata.add_text(x, json.dumps(extra_pnginfo[x]))

        exif_bytes = piexif.dump(exif_data)
        image.save(image_path, format='png', exif=exif_bytes, pnginfo=metadata, optimize=True)

    @staticmethod
    def prepare_preview(latent_tensor, preview_method):
        from comfy.cli_args import LatentPreviewMethod
        import comfy.latent_formats as latent_formats

        lower_bound = 128
        upper_bound = 256

        if preview_method == "Latent2RGB-SD15":
            latent_format = latent_formats.SD15()
            method = LatentPreviewMethod.Latent2RGB
        elif preview_method == "TAESD15":
            latent_format = latent_formats.SD15()
            method = LatentPreviewMethod.TAESD
        elif preview_method == "TAESDXL":
            latent_format = latent_formats.SDXL()
            method = LatentPreviewMethod.TAESD
        else:  # preview_method == "Latent2RGB-SDXL"
            latent_format = latent_formats.SDXL()
            method = LatentPreviewMethod.Latent2RGB

        previewer = core.get_previewer("cpu", latent_format=latent_format, force=True, method=method)

        image = previewer.decode_latent_to_preview(latent_tensor)
        min_size = min(image.size[0], image.size[1])
        max_size = max(image.size[0], image.size[1])

        scale_factor = 1
        if max_size > upper_bound:
            scale_factor = upper_bound/max_size

        # prevent too small preview
        if min_size*scale_factor < lower_bound:
            scale_factor = lower_bound/min_size

        w = int(image.size[0] * scale_factor)
        h = int(image.size[1] * scale_factor)

        image = image.resize((w, h), resample=Image.NEAREST)

        return LatentSender.attach_format_text(image)

    @staticmethod
    def attach_format_text(image):
        width_a, height_a = image.size

        letter_image = Image.open(latent_letter_path)
        width_b, height_b = letter_image.size

        new_width = max(width_a, width_b)
        new_height = height_a + height_b

        new_image = Image.new('RGB', (new_width, new_height), (0, 0, 0))

        offset_x = (new_width - width_b) // 2
        offset_y = (height_a + (new_height - height_a - height_b) // 2)
        new_image.paste(letter_image, (offset_x, offset_y))

        new_image.paste(image, (0, 0))

        return new_image

    def doit(self, samples, filename_prefix="latents/LatentSender", link_id=0, preview_method="Latent2RGB-SDXL", prompt=None, extra_pnginfo=None):
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir)

        # load preview
        preview = LatentSender.prepare_preview(samples['samples'], preview_method)

        # support save metadata for latent sharing
        file = f"{filename}_{counter:05}_.latent.png"
        fullpath = os.path.join(full_output_folder, file)

        output = {"latent_tensor": samples["samples"]}

        tensor_bytes = safetensors.torch.save(output)
        LatentSender.save_to_file(tensor_bytes, prompt, extra_pnginfo, preview, fullpath)

        latent_path = {
                    'filename': file,
                    'subfolder': subfolder,
                    'type': self.type
                    }

        PromptServer.instance.send_sync("latent-send", {"link_id": link_id, "images": [latent_path]})

        return {'ui': {'images': [latent_path]}}

```
