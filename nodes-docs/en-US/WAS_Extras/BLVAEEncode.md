---
tags:
- VAE
---

# VAEEncode (Bundle Latent)
## Documentation
- Class name: `BLVAEEncode`
- Category: `latent`
- Output node: `False`

The BLVAEEncode node is designed for encoding images into a latent space representation using a Variational Autoencoder (VAE). It supports both standard and tiled encoding modes, and offers functionality for storing or loading the encoded latent representations. This node is essential for tasks that require manipulation or analysis of images in their latent form, such as image generation or modification.
## Input types
### Required
- **`vae`**
    - Specifies the Variational Autoencoder (VAE) model to be used for encoding the images into latent space. This parameter is crucial for determining the characteristics of the latent representation.
    - Comfy dtype: `VAE`
    - Python dtype: `object`
- **`tiled`**
    - A boolean flag indicating whether the encoding should be performed in a tiled manner. Tiled encoding can be beneficial for handling large images by processing them in smaller, manageable tiles.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`tile_size`**
    - Defines the size of the tiles (in pixels) to be used when tiled encoding is enabled. This parameter allows for flexibility in managing the granularity of the encoding process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`store_or_load_latent`**
    - A boolean flag that determines whether the encoded latent representation should be stored or loaded. This functionality is useful for workflows that require persistence of latent data.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`remove_latent_on_load`**
    - A boolean flag that indicates whether the latent representation should be removed from storage upon loading. This can help manage storage space efficiently.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`delete_workflow_latent`**
    - A boolean flag that specifies whether the latent representation associated with a workflow should be deleted. This parameter is useful for cleaning up data that is no longer needed.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`image`**
    - The image to be encoded into latent space. This parameter is optional and allows for direct encoding of provided images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The encoded latent representation of the input image. This output is essential for subsequent manipulation or analysis in the latent space.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BLVAEEncode:
    def __init__(self):
        self.VAEEncode = nodes.VAEEncode()
        self.VAEEncodeTiled = nodes.VAEEncodeTiled()
        self.last_hash = None

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "vae": ("VAE",),
                "tiled": ("BOOLEAN", {"default": False}),
                "tile_size": ("INT", {"default": 512, "min": 320, "max": 4096, "step": 64}),
                "store_or_load_latent": ("BOOLEAN", {"default": True}),
                "remove_latent_on_load": ("BOOLEAN", {"default": True}),
                "delete_workflow_latent": ("BOOLEAN", {"default": False})
            },
            "optional": {
                "image": ("IMAGE",),
            },
            "hidden": {
                "extra_pnginfo": "EXTRA_PNGINFO",
                "unique_id": "UNIQUE_ID"
            }
        }

    RETURN_TYPES = ("LATENT", )
    RETURN_NAMES = ("latent", )
    
    FUNCTION = "encode"
    CATEGORY = "latent"

    def encode(self, vae, tiled, tile_size, store_or_load_latent, remove_latent_on_load, delete_workflow_latent, image=None, extra_pnginfo=None, unique_id=None):
        workflow_latent = None
        latent_key = f"latent_{unique_id}"

        if self.last_hash and torch.is_tensor(image):
            if self.last_hash is not self.sha256(image):
                delete_workflow_latent = True
        if torch.is_tensor(image):
            self.last_hash = self.sha256(image)

        if delete_workflow_latent:
            if extra_pnginfo['workflow']['extra'].__contains__(latent_key):
                try:
                    del extra_pnginfo['workflow']['extra'][latent_key]
                except Exception:
                    print(f"Unable to delete latent image from workflow node: {unqiue_id}")
                    pass

        if store_or_load_latent and unique_id:
            if latent_key in extra_pnginfo['workflow']['extra']:
                print(f"Loading latent image from workflow node: {unique_id}")
                try:
                    workflow_latent = self.deserialize(extra_pnginfo['workflow']['extra'][latent_key])
                except Exception as e:
                    print("There was an issue extracting the latent tensor from the workflow. Is it corrupted?")
                    workflow_latent = None
                    if not torch.is_tensor(image):
                        raise ValueError(f"Node {unique_id}: There was no image provided, and workflow latent missing. Unable to proceed.")
                
                if workflow_latent and remove_latent_on_load:
                    try:
                        del extra_pnginfo['workflow']['extra'][latent_key]
                    except Exception:
                        pass

        if workflow_latent:
            print(f"Loaded workflow latent from node: {unique_id}")
            return workflow_latent, { "extra_pnginfo": extra_pnginfo }

        if not torch.is_tensor(image):
            raise ValueError(f"Node {unique_id}: No workflow latent was loaded, and no image provided to encode. Unable to proceed. ")

        if tiled:
            encoded = self.VAEEncodeTiled.encode(pixels=image, tile_size=tile_size, vae=vae)
        else:
            encoded = self.VAEEncode.encode(pixels=image, vae=vae)

        if store_or_load_latent and unique_id:
            print(f"Saving latent to workflow node {unique_id}")
            new_workflow_latent = self.serialize(encoded[0])
            extra_pnginfo['workflow']['extra'][latent_key] = new_workflow_latent

        return encoded[0], { "extra_pnginfo": extra_pnginfo }

    def sha256(self, tensor):
        tensor_bytes = tensor.cpu().contiguous().numpy().tobytes()
        hash_obj = hashlib.sha256()
        hash_obj.update(tensor_bytes)
        return hash_obj.hexdigest()

    def serialize(self, obj):
        json_str = json.dumps(obj, default=lambda o: {'__tensor__': True, 'value': o.cpu().numpy().tolist()} if torch.is_tensor(o) else o.__dict__)
        compressed_data = zlib.compress(json_str.encode('utf-8'))
        base64_encoded = base64.b64encode(compressed_data).decode('utf-8')
        return base64_encoded

    def deserialize(self, base64_str):
        compressed_data = base64.b64decode(base64_str)
        json_str = zlib.decompress(compressed_data).decode('utf-8')
        obj = json.loads(json_str, object_hook=lambda d: torch.tensor(d['value']) if '__tensor__' in d else d)
        return obj

```
