# Documentation
- Class name: SEGS_Classify
- Category: ImpactPack/HuggingFace
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGS_Classify节点旨在使用预训练的变换器模型对图像的段进行分类。它处理段，根据来自分类器的分数评估它们是否满足某个条件，并将段过滤为两个类别：满足条件的段和不满足条件的段。该节点在基于段的图像分析中扮演着关键角色，能够基于复杂标准对图像内容进行分类。

# Input types
## Required
- classifier
    - 分类器参数对节点的操作至关重要，因为它定义了用于对段进行分类的预训练模型。分类的效力直接取决于分类器的质量和适用性。
    - Comfy dtype: TRANSFORMERS_CLASSIFIER
    - Python dtype: transformers.pipeline
- segs
    - segs参数保存需要分类的图像段。这是一个基本输入，因为节点的所有处理都围绕这些段进行。
    - Comfy dtype: SEGS
    - Python dtype: List[Segment]
- preset_expr
    - preset_expr参数允许用户选择用于分类的预定义表达式或选择手动表达式。它决定了将用于分类段的条件。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- manual_expr
    - 当preset_expr设置为'Manual expr'时，此参数用于输入用于分类段的自定义表达式。它为用户定义自己的分类标准提供了灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- ref_image_opt
    - 可选的ref_image_opt参数提供了一个参考图像，如果段的cropped_image属性不可用，则可以使用该参考图像来裁剪段。它通过在需要时提供段图像的替代来源，增强了节点的功能。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Output types
- filtered_SEGS
    - filtered_SEGS输出包含满足用户指定的分类条件的段。它是节点操作的关键结果，代表了基于分类标准过滤的内容。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[Segment, List[Segment]]
- remained_SEGS
    - remained_SEGS输出包括不满足分类条件的段。它是filtered_SEGS的补充结果，提供了对未根据指定标准进行分类的段的洞察。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[Segment, List[Segment]]

# Usage tips
- Infra type: GPU

# Source code
```
class SEGS_Classify:

    @classmethod
    def INPUT_TYPES(s):
        global preset_classify_expr
        return {'required': {'classifier': ('TRANSFORMERS_CLASSIFIER',), 'segs': ('SEGS',), 'preset_expr': (preset_classify_expr + ['Manual expr'],), 'manual_expr': ('STRING', {'multiline': False})}, 'optional': {'ref_image_opt': ('IMAGE',)}}
    RETURN_TYPES = ('SEGS', 'SEGS')
    RETURN_NAMES = ('filtered_SEGS', 'remained_SEGS')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/HuggingFace'

    @staticmethod
    def lookup_classified_label_score(score_infos, label):
        global symbolic_label_map
        if label.startswith('#'):
            if label not in symbolic_label_map:
                return None
            else:
                label = symbolic_label_map[label]
        else:
            label = {label}
        for x in score_infos:
            if x['label'] in label:
                return x['score']
        return None

    def doit(self, classifier, segs, preset_expr, manual_expr, ref_image_opt=None):
        if preset_expr == 'Manual expr':
            expr_str = manual_expr
        else:
            expr_str = preset_expr
        match = re.match(classify_expr_pattern, expr_str)
        if match is None:
            return ((segs[0], []), segs)
        a = match.group(1)
        op = match.group(2)
        b = match.group(3)
        a_is_lab = not is_numeric_string(a)
        b_is_lab = not is_numeric_string(b)
        classified = []
        remained_SEGS = []
        for seg in segs[1]:
            cropped_image = None
            if seg.cropped_image is not None:
                cropped_image = seg.cropped_image
            elif ref_image_opt is not None:
                cropped_image = crop_image(ref_image_opt, seg.crop_region)
            if cropped_image is not None:
                cropped_image = to_pil(cropped_image)
                res = classifier(cropped_image)
                classified.append((seg, res))
            else:
                remained_SEGS.append(seg)
        filtered_SEGS = []
        for (seg, res) in classified:
            if a_is_lab:
                avalue = SEGS_Classify.lookup_classified_label_score(res, a)
            else:
                avalue = a
            if b_is_lab:
                bvalue = SEGS_Classify.lookup_classified_label_score(res, b)
            else:
                bvalue = b
            if avalue is None or bvalue is None:
                remained_SEGS.append(seg)
                continue
            avalue = float(avalue)
            bvalue = float(bvalue)
            if op == '>':
                cond = avalue > bvalue
            elif op == '<':
                cond = avalue < bvalue
            elif op == '>=':
                cond = avalue >= bvalue
            elif op == '<=':
                cond = avalue <= bvalue
            else:
                cond = avalue == bvalue
            if cond:
                filtered_SEGS.append(seg)
            else:
                remained_SEGS.append(seg)
        return ((segs[0], filtered_SEGS), (segs[0], remained_SEGS))
```