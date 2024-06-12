---
tags:
- Latent
---

# LatentReceiver
## Documentation
- Class name: `LatentReceiver`
- Category: `ImpactPack/Util`
- Output node: `False`

The node 'LatentReceiver' is not explicitly defined in the provided context, indicating a potential misunderstanding or misnaming in the query. The context describes various nodes related to the manipulation and transformation of latent vectors in generative models, such as adding, subtracting, interpolating, and batch processing of latent samples. These operations are essential for advanced modifications and analyses of generated content, but do not directly relate to a 'LatentReceiver' node.
## Input types
### Required
- **`latent`**
    - This parameter represents the latent vector or representation to be received or processed by the node. Its role is crucial for the node's operation, as it directly influences the manipulation or transformation applied to the latent space.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `torch.Tensor`
- **`link_id`**
    - The 'link_id' parameter is likely intended for identifying or linking specific operations or data flows within the node's processing pipeline, although its exact purpose cannot be determined from the provided context.
    - Comfy dtype: `INT`
    - Python dtype: `str`
- **`trigger_always`**
    - This parameter suggests a control mechanism for the node's operation, possibly to trigger processing under certain conditions or to ensure continuous operation. The exact functionality cannot be inferred from the provided context.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output 'latent' likely represents the transformed or manipulated latent vector resulting from the node's operation. This output is essential for further processing or analysis within the generative model's pipeline.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LatentReceiver:
    def __init__(self):
        self.input_dir = folder_paths.get_input_directory()
        self.type = "input"

    @classmethod
    def INPUT_TYPES(s):
        def check_file_extension(x):
            return x.endswith(".latent") or x.endswith(".latent.png")

        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f)) and check_file_extension(f)]
        return {"required": {
                    "latent": (sorted(files), ),
                    "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                    "trigger_always": ("BOOLEAN", {"default": False, "label_on": "enable", "label_off": "disable"}),
                    },
                }

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    RETURN_TYPES = ("LATENT",)

    @staticmethod
    def load_preview_latent(image_path):
        if not os.path.exists(image_path):
            return None

        image = Image.open(image_path)
        exif_data = piexif.load(image.info["exif"])

        if piexif.ExifIFD.UserComment in exif_data["Exif"]:
            compressed_data = exif_data["Exif"][piexif.ExifIFD.UserComment]
            compressed_data_io = BytesIO(compressed_data)
            with zipfile.ZipFile(compressed_data_io, mode='r') as archive:
                tensor_bytes = archive.read("latent")
            tensor = safetensors.torch.load(tensor_bytes)
            return {"samples": tensor['latent_tensor']}
        return None

    def parse_filename(self, filename):
        pattern = r"^(.*)/(.*?)\[(.*)\]\s*$"
        match = re.match(pattern, filename)
        if match:
            subfolder = match.group(1)
            filename = match.group(2).rstrip()
            file_type = match.group(3)
        else:
            subfolder = ''
            file_type = self.type

        return {'filename': filename, 'subfolder': subfolder, 'type': file_type}

    def doit(self, **kwargs):
        if 'latent' not in kwargs:
            return (torch.zeros([1, 4, 8, 8]), )

        latent = kwargs['latent']

        latent_name = latent
        latent_path = folder_paths.get_annotated_filepath(latent_name)

        if latent.endswith(".latent"):
            latent = safetensors.torch.load_file(latent_path, device="cpu")
            multiplier = 1.0
            if "latent_format_version_0" not in latent:
                multiplier = 1.0 / 0.18215
            samples = {"samples": latent["latent_tensor"].float() * multiplier}
        else:
            samples = LatentReceiver.load_preview_latent(latent_path)

        if samples is None:
            samples = {'samples': torch.zeros([1, 4, 8, 8])}

        preview = self.parse_filename(latent_name)

        return {
                'ui': {"images": [preview]},
                'result': (samples, )
                }

    @classmethod
    def IS_CHANGED(s, latent, link_id, trigger_always):
        if trigger_always:
            return float("NaN")
        else:
            image_path = folder_paths.get_annotated_filepath(latent)
            m = hashlib.sha256()
            with open(image_path, 'rb') as f:
                m.update(f.read())
            return m.digest().hex()

    @classmethod
    def VALIDATE_INPUTS(s, latent, link_id, trigger_always):
        if not folder_paths.exists_annotated_filepath(latent) or latent.startswith("/") or ".." in latent:
            return "Invalid latent file: {}".format(latent)
        return True

```
