# Documentation
- Class name: SEGSPicker
- Category: ImpactPack/Util
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSPicker节点旨在处理和选择一系列分段中的片段。它接收一个选择的列表，这些是对应于要被选择的分段的索引，以及一组分段。如果提供了备用图像，则该节点将分段缩放到与备用图像匹配，对裁剪后的图像应用掩码，然后根据选择返回一组新的选定分段。它在简化分段选择过程和确保输出符合应用程序的具体要求方面发挥着关键作用。

# Input types
## Required
- picks
    - ‘picks’参数是一个字符串，包含用逗号分隔的索引列表，表示要被选择的分段。它对节点的功能至关重要，因为它决定了输入集合中哪些分段将被处理并返回为输出。
    - Comfy dtype: STRING
    - Python dtype: str
- segs
    - ‘segs’参数是节点将处理的分段对象集合。这是一个必需的输入，因为节点的目的是根据不同的选择来操作和选择这些分段。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
## Optional
- fallback_image_opt
    - ‘fallback_image_opt’参数是一个可选的图像，如果提供了该参数，节点将使用它来缩放分段。它可以通过确保分段的大小适当，以便于进一步处理或显示，从而影响节点的输出。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- unique_id
    - ‘unique_id’参数是一个隐藏字段，节点内部使用它来跟踪和管理分段。它不直接影响节点的执行，但对于维护数据的完整性很重要。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- segs
    - ‘segs’输出参数代表基于节点接收的选择生成的新的选定分段集合。它是节点处理的最终结果，并且很重要，因为它代表了进一步使用或分析的最终输出。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[List[SEG], List[SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSPicker:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'picks': ('STRING', {'multiline': True, 'dynamicPrompts': False, 'pysssss.autocomplete': False}), 'segs': ('SEGS',)}, 'optional': {'fallback_image_opt': ('IMAGE',)}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('SEGS',)
    OUTPUT_NODE = True
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, picks, segs, fallback_image_opt=None, unique_id=None):
        if fallback_image_opt is not None:
            segs = core.segs_scale_match(segs, fallback_image_opt.shape)
        cands = []
        for seg in segs[1]:
            if seg.cropped_image is not None:
                cropped_image = seg.cropped_image
            elif fallback_image_opt is not None:
                cropped_image = crop_image(fallback_image_opt, seg.crop_region)
            else:
                cropped_image = empty_pil_tensor()
            mask_array = seg.cropped_mask.copy()
            mask_array[mask_array < 0.3] = 0.3
            mask_array = mask_array[None, ..., None]
            cropped_image = cropped_image * mask_array
            cands.append(cropped_image)
        impact.impact_server.segs_picker_map[unique_id] = cands
        pick_ids = set()
        for pick in picks.split(','):
            try:
                pick_ids.add(int(pick) - 1)
            except Exception:
                pass
        new_segs = []
        for i in pick_ids:
            if 0 <= i < len(segs[1]):
                new_segs.append(segs[1][i])
        return ((segs[0], new_segs),)
```