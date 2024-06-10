# Documentation
- Class name: BLVAEEncode
- Category: latent
- Output node: False
- Repo Ref: https://github.com/WASasquatch/WAS_Extras

BLVAEEncode节点旨在使用变分自编码器（VAE）将图像编码为潜在空间表示。它提供了加载现有潜在表示或从输入图像编码新表示的功能。该节点还提供了管理潜在数据的选项，例如存储它以备将来使用或从工作流中删除它。

# Input types
## Required
- vae
    - VAE参数对于编码过程至关重要，因为它代表了将用于将输入图像转换为潜在表示的变分自编码器模型。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
## Optional
- tiled
    - tiled参数决定是否应以平铺方式执行编码过程，这对于处理较大的图像可能有益，因为这些图像在整体编码时可能无法全部装入内存。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- tile_size
    - tile_size参数指定了图像将被划分为平铺编码的瓦片大小。当处理需要平铺方法的大型图像时，这是一个重要参数。
    - Comfy dtype: INT
    - Python dtype: int
- store_or_load_latent
    - store_or_load_latent参数控制节点是否应尝试从工作流加载潜在表示，或将新编码的潜在表示存储回工作流以供将来使用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- remove_latent_on_load
    - 当设置为true时，remove_latent_on_load参数指示节点在成功加载潜在表示后从工作流中删除它，以释放空间和资源。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- delete_workflow_latent
    - 当设置为true时，delete_workflow_latent参数指示节点删除工作流中的任何现有潜在表示，无论是否正在编码新的表示。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- image
    - image参数是要编码到潜在空间的输入图像。当没有现有的潜在表示可以从工作流中加载时，这是一个强制性参数。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- extra_pnginfo
    - extra_pnginfo参数用于存储和检索与图像相关的附加信息，例如元数据或编码过程可能需要的其他辅助数据。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]
- unique_id
    - unique_id参数是工作流中节点实例的唯一标识符，用于管理潜在表示的存储和检索。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- latent
    - latent参数代表输入图像的编码潜在空间表示。它是BLVAEEncode节点的主要输出，并用于工作流中的进一步处理或分析。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class BLVAEEncode:

    def __init__(self):
        self.VAEEncode = nodes.VAEEncode()
        self.VAEEncodeTiled = nodes.VAEEncodeTiled()
        self.last_hash = None

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'vae': ('VAE',), 'tiled': ('BOOLEAN', {'default': False}), 'tile_size': ('INT', {'default': 512, 'min': 320, 'max': 4096, 'step': 64}), 'store_or_load_latent': ('BOOLEAN', {'default': True}), 'remove_latent_on_load': ('BOOLEAN', {'default': True}), 'delete_workflow_latent': ('BOOLEAN', {'default': False})}, 'optional': {'image': ('IMAGE',)}, 'hidden': {'extra_pnginfo': 'EXTRA_PNGINFO', 'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('LATENT',)
    RETURN_NAMES = ('latent',)
    FUNCTION = 'encode'
    CATEGORY = 'latent'

    def encode(self, vae, tiled, tile_size, store_or_load_latent, remove_latent_on_load, delete_workflow_latent, image=None, extra_pnginfo=None, unique_id=None):
        workflow_latent = None
        latent_key = f'latent_{unique_id}'
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
                    print(f'Unable to delete latent image from workflow node: {unqiue_id}')
                    pass
        if store_or_load_latent and unique_id:
            if latent_key in extra_pnginfo['workflow']['extra']:
                print(f'Loading latent image from workflow node: {unique_id}')
                try:
                    workflow_latent = self.deserialize(extra_pnginfo['workflow']['extra'][latent_key])
                except Exception as e:
                    print('There was an issue extracting the latent tensor from the workflow. Is it corrupted?')
                    workflow_latent = None
                    if not torch.is_tensor(image):
                        raise ValueError(f'Node {unique_id}: There was no image provided, and workflow latent missing. Unable to proceed.')
                if workflow_latent and remove_latent_on_load:
                    try:
                        del extra_pnginfo['workflow']['extra'][latent_key]
                    except Exception:
                        pass
        if workflow_latent:
            print(f'Loaded workflow latent from node: {unique_id}')
            return (workflow_latent, {'extra_pnginfo': extra_pnginfo})
        if not torch.is_tensor(image):
            raise ValueError(f'Node {unique_id}: No workflow latent was loaded, and no image provided to encode. Unable to proceed. ')
        if tiled:
            encoded = self.VAEEncodeTiled.encode(pixels=image, tile_size=tile_size, vae=vae)
        else:
            encoded = self.VAEEncode.encode(pixels=image, vae=vae)
        if store_or_load_latent and unique_id:
            print(f'Saving latent to workflow node {unique_id}')
            new_workflow_latent = self.serialize(encoded[0])
            extra_pnginfo['workflow']['extra'][latent_key] = new_workflow_latent
        return (encoded[0], {'extra_pnginfo': extra_pnginfo})

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