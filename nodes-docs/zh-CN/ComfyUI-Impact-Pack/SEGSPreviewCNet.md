# Documentation
- Class name: SEGSPreviewCNet
- Category: ImpactPack/Util
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSPreviewCNet 是一个用于处理和预览分割结果的节点。它接受分割数据作为输入，并生成一系列预览图像，增强了对分割工作的可视化检查和分析。该节点在提供分割工作的可视化摘要方面至关重要，允许快速评估并在需要时进行进一步操作。

# Input types
## Required
- segs
    - 'ssegs' 参数对于节点的操作至关重要，因为它提供了节点将处理的分割数据。这是一个必需的输入，它通过确定生成的预览图像的内容直接影响节点的输出。
    - Comfy dtype: SEGS
    - Python dtype: List[Tuple[str, SEG]]

# Output types
- ui
    - 输出中的 'ui' 参数非常重要，因为它包含了将显示给用户的用户界面元素。它包括代表分割预览的图像列表，这对于用户交互和视觉反馈至关重要。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]
- result
    - 输出中的 'result' 参数是节点处理的图像集合。它是节点的主要输出，包含了分割数据的视觉表示，这是节点功能的主要目标。
    - Comfy dtype: COMBO[IMAGE]
    - Python dtype: Tuple[List[Image.Image], ...]

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSPreviewCNet:

    def __init__(self):
        self.output_dir = folder_paths.get_temp_directory()
        self.type = 'temp'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',)}}
    RETURN_TYPES = ('IMAGE',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'
    OUTPUT_NODE = True

    def doit(self, segs):
        (full_output_folder, filename, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path('impact_seg_preview', self.output_dir, segs[0][1], segs[0][0])
        results = list()
        result_image_list = []
        for seg in segs[1]:
            file = f'{filename}_{counter:05}_.webp'
            if seg.control_net_wrapper is not None and seg.control_net_wrapper.control_image is not None:
                cnet_image = seg.control_net_wrapper.control_image
                result_image_list.append(cnet_image)
            else:
                cnet_image = empty_pil_tensor(64, 64)
            cnet_pil = utils.tensor2pil(cnet_image)
            cnet_pil.save(os.path.join(full_output_folder, file))
            results.append({'filename': file, 'subfolder': subfolder, 'type': self.type})
            counter += 1
        return {'ui': {'images': results}, 'result': (result_image_list,)}
```