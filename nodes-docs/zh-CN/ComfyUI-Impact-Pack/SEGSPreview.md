# Documentation
- Class name: SEGSPreview
- Category: ImpactPack/Util
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSPreview节点旨在处理和预览分割图像。它接受分割数据和可选参数来控制alpha混合和最小alpha值，然后生成一个视觉表示分割的预览图像。该节点能够处理一批分割数据，并且在分割数据不可用时可以回退到默认图像。

# Input types
## Required
- segs
    - ‘segs’参数对于节点至关重要，因为它提供了节点将处理的分割数据。此输入直接影响预览图像的生成方式及其质量。
    - Comfy dtype: SEGS
    - Python dtype: List[Tuple[int, np.ndarray]]
## Optional
- alpha_mode
    - ‘alpha_mode’参数决定预览中是否启用alpha混合。它在处理最终输出中分割遮罩的透明度方面起着重要作用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- min_alpha
    - ‘min_alpha’参数设置遮罩的最小alpha值，确保即使在遮罩置信度低的区域，分割也是可见的。这对于预览中分割的视觉清晰度至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- fallback_image_opt
    - ‘fallback_image_opt’参数提供了一个可选图像，当分割数据不可用时使用。它确保了即使在这种情况下，节点仍然可以生成预览。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- ui
    - ‘ui’输出包含预览的用户界面元素，包括已处理并准备显示的图像列表。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, List[Dict[str, str]]}
- result
    - ‘result’输出是代表分割预览的组合图像批次的列表。它很重要，因为它包含了分割的实际视觉数据。
    - Comfy dtype: COMBO[torch.Tensor]
    - Python dtype: Tuple[List[torch.Tensor],]

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSPreview:

    def __init__(self):
        self.output_dir = folder_paths.get_temp_directory()
        self.type = 'temp'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'alpha_mode': ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'}), 'min_alpha': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 1.0, 'step': 0.01})}, 'optional': {'fallback_image_opt': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'
    OUTPUT_NODE = True

    def doit(self, segs, alpha_mode=True, min_alpha=0.0, fallback_image_opt=None):
        (full_output_folder, filename, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path('impact_seg_preview', self.output_dir, segs[0][1], segs[0][0])
        results = list()
        result_image_list = []
        if fallback_image_opt is not None:
            segs = core.segs_scale_match(segs, fallback_image_opt.shape)
        if min_alpha != 0:
            min_alpha = int(255 * min_alpha)
        if len(segs[1]) > 0:
            if segs[1][0].cropped_image is not None:
                batch_count = len(segs[1][0].cropped_image)
            elif fallback_image_opt is not None:
                batch_count = len(fallback_image_opt)
            else:
                return {'ui': {'images': results}}
            for seg in segs[1]:
                result_image_batch = None
                cached_mask = None

                def get_combined_mask():
                    nonlocal cached_mask
                    if cached_mask is not None:
                        return cached_mask
                    else:
                        if isinstance(seg.cropped_mask, np.ndarray):
                            masks = torch.tensor(seg.cropped_mask)
                        else:
                            masks = seg.cropped_mask
                        cached_mask = (masks[0] * 255).to(torch.uint8)
                        for x in masks[1:]:
                            cached_mask |= (x * 255).to(torch.uint8)
                        cached_mask = (cached_mask / 255.0).to(torch.float32)
                        cached_mask = utils.to_binary_mask(cached_mask, 0.1)
                        cached_mask = cached_mask.numpy()
                        return cached_mask

                def stack_image(image, mask=None):
                    nonlocal result_image_batch
                    if isinstance(image, np.ndarray):
                        image = torch.from_numpy(image)
                    if mask is not None:
                        image *= torch.tensor(mask)[None, ..., None]
                    if result_image_batch is None:
                        result_image_batch = image
                    else:
                        result_image_batch = torch.concat((result_image_batch, image), dim=0)
                for i in range(batch_count):
                    cropped_image = None
                    if seg.cropped_image is not None:
                        cropped_image = seg.cropped_image[i, None]
                    elif fallback_image_opt is not None:
                        ref_image = fallback_image_opt[i].unsqueeze(0)
                        cropped_image = crop_image(ref_image, seg.crop_region)
                    if cropped_image is not None:
                        if isinstance(cropped_image, np.ndarray):
                            cropped_image = torch.from_numpy(cropped_image)
                        cropped_image = cropped_image.clone()
                        cropped_pil = to_pil(cropped_image)
                        if alpha_mode:
                            if isinstance(seg.cropped_mask, np.ndarray):
                                cropped_mask = seg.cropped_mask
                            elif seg.cropped_image is not None and len(seg.cropped_image) != len(seg.cropped_mask):
                                cropped_mask = get_combined_mask()
                            else:
                                cropped_mask = seg.cropped_mask[i].numpy()
                            mask_array = (cropped_mask * 255).astype(np.uint8)
                            if min_alpha != 0:
                                mask_array[mask_array < min_alpha] = min_alpha
                            mask_pil = Image.fromarray(mask_array, mode='L').resize(cropped_pil.size)
                            cropped_pil.putalpha(mask_pil)
                            stack_image(cropped_image, cropped_mask)
                        else:
                            stack_image(cropped_image)
                        file = f'{filename}_{counter:05}_.webp'
                        cropped_pil.save(os.path.join(full_output_folder, file))
                        results.append({'filename': file, 'subfolder': subfolder, 'type': self.type})
                        counter += 1
                if result_image_batch is not None:
                    result_image_list.append(result_image_batch)
        return {'ui': {'images': results}, 'result': (result_image_list,)}
```