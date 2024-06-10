# Documentation
- Class name: SimpleDetectorForAnimateDiff
- Category: ImpactPack/Detector
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SimpleDetectorForAnimateDiff 节点旨在检测和处理一系列图像中的动画差异。它利用边界框检测和可选的语义分割模型来识别和分割感兴趣的区域。该节点能够处理多种操作模式，包括使用单个帧作为参考、组合邻近帧或独立分割每个帧。它强调检测重大变化并创建掩码以隔离这些变化以进行进一步分析。

# Input types
## Required
- bbox_detector
    - bbox_detector 参数对于在图像帧中最初检测边界框至关重要。它为进一步的分析和分割过程奠定了基础。bbox_detector 的有效性直接影响后续步骤的准确性，使其成为节点操作中的关键组件。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: torch.nn.Module
- image_frames
    - image_frames 参数至关重要，因为它代表了节点的输入数据。它包含节点将分析的图像序列，以检测动画差异。image_frames 的质量和分辨率直接影响节点检测和准确分割变化的能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- bbox_threshold
    - bbox_threshold 参数定义了边界框检测的置信度水平。它是决定哪些边界框被考虑进行进一步处理的关键因素。调整此阈值可以显著影响节点的检测能力和随后的分割结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_dilation
    - bbox_dilation 参数用于扩大检测到的边界框的大小。这种扩展对于确保分割过程捕获整个感兴趣的区域非常重要，特别是当边界框靠近物体边缘或彼此靠近时。
    - Comfy dtype: INT
    - Python dtype: int
- crop_factor
    - crop_factor 参数非常重要，因为它决定了围绕检测区域裁剪图像的程度。这有助于将分析集中在图像最相关的部分，并减少周围区域的噪声。
    - Comfy dtype: FLOAT
    - Python dtype: float
- drop_size
    - drop_size 参数在分割过程中决定了被丢弃区域的大小。它在微调分割掩码中起着至关重要的作用，以确保它准确地表示感兴趣的区域，而没有不必要的细节。
    - Comfy dtype: INT
    - Python dtype: int
- sub_threshold
    - sub_threshold 参数对微调分割过程很重要。它有助于确定分割掩码中捕获的细节水平，在精度和包含相关信息之间取得平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sub_dilation
    - sub_dilation 参数用于控制分割掩码的扩展。它是确保掩码完全封装感兴趣的区域的关键因素，考虑到初始检测中可能存在的任何潜在不准确性。
    - Comfy dtype: INT
    - Python dtype: int
- sub_bbox_expansion
    - sub_bbox_expansion 参数允许扩展用于分割过程中的边界框。这对于捕获可能比初始检测建议的区域略大的区域特别有用，确保更全面的分割。
    - Comfy dtype: INT
    - Python dtype: int
- sam_mask_hint_threshold
    - sam_mask_hint_threshold 参数与 SAM（语义注释模型）一起使用，以细化分割掩码。它有助于控制掩码中的细节水平，确保掩码与所需的感兴趣区域紧密匹配。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- SEGS
    - 输出 SEGS（语义注释片段）参数表示节点分析的结果。它包含在输入图像帧中识别的感兴趣的分段区域。这些片段对于进一步的处理和分析至关重要，例如跟踪变化或识别动画中的特定特征。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]

# Usage tips
- Infra type: GPU

# Source code
```
class SimpleDetectorForAnimateDiff:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'bbox_detector': ('BBOX_DETECTOR',), 'image_frames': ('IMAGE',), 'bbox_threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'bbox_dilation': ('INT', {'default': 0, 'min': -255, 'max': 255, 'step': 1}), 'crop_factor': ('FLOAT', {'default': 3.0, 'min': 1.0, 'max': 100, 'step': 0.1}), 'drop_size': ('INT', {'min': 1, 'max': MAX_RESOLUTION, 'step': 1, 'default': 10}), 'sub_threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'sub_dilation': ('INT', {'default': 0, 'min': -255, 'max': 255, 'step': 1}), 'sub_bbox_expansion': ('INT', {'default': 0, 'min': 0, 'max': 1000, 'step': 1}), 'sam_mask_hint_threshold': ('FLOAT', {'default': 0.7, 'min': 0.0, 'max': 1.0, 'step': 0.01})}, 'optional': {'masking_mode': (['Pivot SEGS', 'Combine neighboring frames', "Don't combine"],), 'segs_pivot': (['Combined mask', '1st frame mask'],), 'sam_model_opt': ('SAM_MODEL',), 'segm_detector_opt': ('SEGM_DETECTOR',)}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detector'

    @staticmethod
    def detect(bbox_detector, image_frames, bbox_threshold, bbox_dilation, crop_factor, drop_size, sub_threshold, sub_dilation, sub_bbox_expansion, sam_mask_hint_threshold, masking_mode='Pivot SEGS', segs_pivot='Combined mask', sam_model_opt=None, segm_detector_opt=None):
        h = image_frames.shape[1]
        w = image_frames.shape[2]
        segs_by_frames = []
        for image in image_frames:
            image = image.unsqueeze(0)
            segs = bbox_detector.detect(image, bbox_threshold, bbox_dilation, crop_factor, drop_size)
            if sam_model_opt is not None:
                mask = core.make_sam_mask(sam_model_opt, segs, image, 'center-1', sub_dilation, sub_threshold, sub_bbox_expansion, sam_mask_hint_threshold, False)
                segs = core.segs_bitwise_and_mask(segs, mask)
            elif segm_detector_opt is not None:
                segm_segs = segm_detector_opt.detect(image, sub_threshold, sub_dilation, crop_factor, drop_size)
                mask = core.segs_to_combined_mask(segm_segs)
                segs = core.segs_bitwise_and_mask(segs, mask)
            segs_by_frames.append(segs)

        def get_masked_frames():
            masks_by_frame = []
            for (i, segs) in enumerate(segs_by_frames):
                masks_in_frame = segs_nodes.SEGSToMaskList().doit(segs)[0]
                current_frame_mask = (masks_in_frame[0] * 255).to(torch.uint8)
                for mask in masks_in_frame[1:]:
                    current_frame_mask |= (mask * 255).to(torch.uint8)
                current_frame_mask = (current_frame_mask / 255.0).to(torch.float32)
                current_frame_mask = utils.to_binary_mask(current_frame_mask, 0.1)[0]
                masks_by_frame.append(current_frame_mask)
            return masks_by_frame

        def get_empty_mask():
            return torch.zeros((h, w), dtype=torch.float32, device='cpu')

        def get_neighboring_mask_at(i, masks_by_frame):
            prv = masks_by_frame[i - 1] if i > 1 else get_empty_mask()
            cur = masks_by_frame[i]
            nxt = masks_by_frame[i - 1] if i > 1 else get_empty_mask()
            prv = prv if prv is not None else get_empty_mask()
            cur = cur.clone() if cur is not None else get_empty_mask()
            nxt = nxt if nxt is not None else get_empty_mask()
            return (prv, cur, nxt)

        def get_merged_neighboring_mask(masks_by_frame):
            if len(masks_by_frame) <= 1:
                return masks_by_frame
            result = []
            for i in range(0, len(masks_by_frame)):
                (prv, cur, nxt) = get_neighboring_mask_at(i, masks_by_frame)
                cur = (cur * 255).to(torch.uint8)
                cur |= (prv * 255).to(torch.uint8)
                cur |= (nxt * 255).to(torch.uint8)
                cur = (cur / 255.0).to(torch.float32)
                cur = utils.to_binary_mask(cur, 0.1)[0]
                result.append(cur)
            return result

        def get_whole_merged_mask():
            all_masks = []
            for segs in segs_by_frames:
                all_masks += segs_nodes.SEGSToMaskList().doit(segs)[0]
            merged_mask = (all_masks[0] * 255).to(torch.uint8)
            for mask in all_masks[1:]:
                merged_mask |= (mask * 255).to(torch.uint8)
            merged_mask = (merged_mask / 255.0).to(torch.float32)
            merged_mask = utils.to_binary_mask(merged_mask, 0.1)[0]
            return merged_mask

        def get_pivot_segs():
            if segs_pivot == '1st frame mask':
                return segs_by_frames[0][1]
            else:
                merged_mask = get_whole_merged_mask()
                return segs_nodes.MaskToSEGS().doit(merged_mask, False, crop_factor, False, drop_size, contour_fill=True)[0]

        def get_merged_neighboring_segs():
            pivot_segs = get_pivot_segs()
            masks_by_frame = get_masked_frames()
            masks_by_frame = get_merged_neighboring_mask(masks_by_frame)
            new_segs = []
            for seg in pivot_segs[1]:
                cropped_mask = torch.zeros(seg.cropped_mask.shape, dtype=torch.float32, device='cpu').unsqueeze(0)
                pivot_mask = torch.from_numpy(seg.cropped_mask)
                (x1, y1, x2, y2) = seg.crop_region
                for mask in masks_by_frame:
                    cropped_mask_at_frame = (mask[y1:y2, x1:x2] * pivot_mask).unsqueeze(0)
                    cropped_mask = torch.cat((cropped_mask, cropped_mask_at_frame), dim=0)
                if len(cropped_mask) > 1:
                    cropped_mask = cropped_mask[1:]
                new_seg = SEG(seg.cropped_image, cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, seg.control_net_wrapper)
                new_segs.append(new_seg)
            return (pivot_segs[0], new_segs)

        def get_separated_segs():
            pivot_segs = get_pivot_segs()
            masks_by_frame = get_masked_frames()
            new_segs = []
            for seg in pivot_segs[1]:
                cropped_mask = torch.zeros(seg.cropped_mask.shape, dtype=torch.float32, device='cpu').unsqueeze(0)
                (x1, y1, x2, y2) = seg.crop_region
                for mask in masks_by_frame:
                    cropped_mask_at_frame = mask[y1:y2, x1:x2]
                    cropped_mask = torch.cat((cropped_mask, cropped_mask_at_frame), dim=0)
                new_seg = SEG(seg.cropped_image, cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, seg.control_net_wrapper)
                new_segs.append(new_seg)
            return (pivot_segs[0], new_segs)
        if masking_mode == 'Pivot SEGS':
            return (get_pivot_segs(),)
        elif masking_mode == 'Combine neighboring frames':
            return (get_merged_neighboring_segs(),)
        else:
            return (get_separated_segs(),)

    def doit(self, bbox_detector, image_frames, bbox_threshold, bbox_dilation, crop_factor, drop_size, sub_threshold, sub_dilation, sub_bbox_expansion, sam_mask_hint_threshold, masking_mode='Pivot SEGS', segs_pivot='Combined mask', sam_model_opt=None, segm_detector_opt=None):
        return SimpleDetectorForAnimateDiff.detect(bbox_detector, image_frames, bbox_threshold, bbox_dilation, crop_factor, drop_size, sub_threshold, sub_dilation, sub_bbox_expansion, sam_mask_hint_threshold, masking_mode, segs_pivot, sam_model_opt, segm_detector_opt)
```