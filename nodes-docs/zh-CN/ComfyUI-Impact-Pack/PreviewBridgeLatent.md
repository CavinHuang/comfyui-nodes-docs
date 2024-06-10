# Documentation
- Class name: PreviewBridgeLatent
- Category: ImpactPack/Util
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

PreviewBridgeLatent类作为高效可视化和管理图像潜在表示的桥梁，提供了一种将这些潜在表示转换为预览格式的方法，该格式可以在系统中轻松解释和使用。

# Input types
## Required
- latent
    - latent参数是必需的，因为它包含了需要可视化的图像的编码表示。它通过提供图像重建过程所需的原始数据，在节点的功能中发挥关键作用。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]
- image
    - image参数对节点至关重要，因为它标识了要处理的特定图像。它通过确定要可视化哪个图像的潜在表示来影响节点的执行。
    - Comfy dtype: STRING
    - Python dtype: str
- preview_method
    - preview_method参数决定了从潜在数据生成视觉表示所使用的方法。它是节点操作的组成部分，因为它根据所选的可视化方法塑造输出图像。
    - Comfy dtype: COMBO
    - Python dtype: Union[str, None]
## Optional
- vae_opt
    - 当提供vae_opt参数时，允许使用特定的VAE模型来解码潜在数据。它的包含可以显著影响最终预览图像的质量和风格。
    - Comfy dtype: VAE
    - Python dtype: Union[torch.nn.Module, None]
- unique_id
    - unique_id参数用于跟踪和管理处理过的图像的缓存。它对节点的效率很重要，因为它有助于避免冗余处理，并确保始终可用图像的最新版本。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- ui
    - ui输出提供了处理后图像的用户界面表示，其中包括文件名和子文件夹位置等信息。这个输出对于将可视化数据集成到系统用户界面中至关重要。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]
- result
    - result输出包含处理后图像的潜在表示和掩码。这个输出是必不可少的，因为它提供了系统内进一步分析或操作所需的原始数据。
    - Comfy dtype: TUPLE
    - Python dtype: Tuple[Dict[str, Any], torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class PreviewBridgeLatent:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latent': ('LATENT',), 'image': ('STRING', {'default': ''}), 'preview_method': (['Latent2RGB-SDXL', 'Latent2RGB-SD15', 'TAESDXL', 'TAESD15'],)}, 'optional': {'vae_opt': ('VAE',)}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('LATENT', 'MASK')
    FUNCTION = 'doit'
    OUTPUT_NODE = True
    CATEGORY = 'ImpactPack/Util'

    def __init__(self):
        super().__init__()
        self.output_dir = folder_paths.get_temp_directory()
        self.type = 'temp'
        self.prev_hash = None
        self.prefix_append = '_temp_' + ''.join((random.choice('abcdefghijklmnopqrstupvxyz') for x in range(5)))

    @staticmethod
    def load_image(pb_id):
        is_fail = False
        if pb_id not in core.preview_bridge_image_id_map:
            is_fail = True
        (image_path, ui_item) = core.preview_bridge_image_id_map[pb_id]
        if not os.path.isfile(image_path):
            is_fail = True
        if not is_fail:
            i = Image.open(image_path)
            i = ImageOps.exif_transpose(i)
            image = i.convert('RGB')
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            if 'A' in i.getbands():
                mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
                mask = 1.0 - torch.from_numpy(mask)
            else:
                mask = None
        else:
            image = empty_pil_tensor()
            mask = None
            ui_item = {'filename': 'empty.png', 'subfolder': '', 'type': 'temp'}
        return (image, mask, ui_item)

    def doit(self, latent, image, preview_method, vae_opt=None, unique_id=None):
        need_refresh = False
        if unique_id not in core.preview_bridge_cache:
            need_refresh = True
        elif core.preview_bridge_cache[unique_id][0] is not latent or (vae_opt is None and core.preview_bridge_cache[unique_id][2] is not None) or (vae_opt is None and core.preview_bridge_cache[unique_id][1] != preview_method) or (vae_opt is not None and core.preview_bridge_cache[unique_id][2] is not vae_opt):
            need_refresh = True
        if not need_refresh:
            (pixels, mask, path_item) = PreviewBridge.load_image(image)
            if mask is None:
                mask = torch.ones(latent['samples'].shape[2:], dtype=torch.float32, device='cpu').unsqueeze(0)
                if 'noise_mask' in latent:
                    res_latent = latent.copy()
                    del res_latent['noise_mask']
                else:
                    res_latent = latent
            else:
                res_latent = latent.copy()
                res_latent['noise_mask'] = mask
            res_image = [path_item]
        else:
            decoded_image = decode_latent(latent, preview_method, vae_opt)
            if 'noise_mask' in latent:
                mask = latent['noise_mask']
                decoded_pil = to_pil(decoded_image)
                inverted_mask = 1 - mask
                resized_mask = resize_mask(inverted_mask, (decoded_image.shape[1], decoded_image.shape[2]))
                result_pil = apply_mask_alpha_to_pil(decoded_pil, resized_mask)
                (full_output_folder, filename, counter, _, _) = folder_paths.get_save_image_path('PreviewBridge/PBL-' + self.prefix_append, folder_paths.get_temp_directory(), result_pil.size[0], result_pil.size[1])
                file = f'{filename}_{counter}.png'
                result_pil.save(os.path.join(full_output_folder, file), compress_level=4)
                res_image = [{'filename': file, 'subfolder': 'PreviewBridge', 'type': 'temp'}]
            else:
                mask = torch.ones(latent['samples'].shape[2:], dtype=torch.float32, device='cpu').unsqueeze(0)
                res = nodes.PreviewImage().save_images(decoded_image, filename_prefix='PreviewBridge/PBL-')
                res_image = res['ui']['images']
            path = os.path.join(folder_paths.get_temp_directory(), 'PreviewBridge', res_image[0]['filename'])
            core.set_previewbridge_image(unique_id, path, res_image[0])
            core.preview_bridge_image_id_map[image] = (path, res_image[0])
            core.preview_bridge_image_name_map[unique_id, path] = (image, res_image[0])
            core.preview_bridge_cache[unique_id] = (latent, preview_method, vae_opt, res_image)
            res_latent = latent
        return {'ui': {'images': res_image}, 'result': (res_latent, mask)}
```