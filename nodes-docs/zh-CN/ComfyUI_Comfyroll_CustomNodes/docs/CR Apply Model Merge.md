# Documentation
- Class name: CR_ApplyModelMerge
- Category: Comfyroll/Model Merge
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ApplyModelMerge节点旨在方便地将多个模型合并为一个单一的统一模型。它通过智能地组合模型比例和剪贴比例，在必要时进行归一化，并应用指定的合并方法来创建所选模型的和谐混合。该节点对于高级模型管理至关重要，使用户能够尝试不同的模型组合和比例以实现期望的结果。

# Input types
## Required
- model_stack
    - 模型栈参数至关重要，因为它定义了要合并的模型序列。它在节点的执行中起着核心作用，决定了将贡献给最终合并模型的模型。
    - Comfy dtype: MODEL_STACK
    - Python dtype: List[Tuple[str, float, float]]
- merge_method
    - 合并方法参数决定了模型的组合方式。它是节点功能的关键因素，因为它决定了用于合并的算法，这可以显著影响结果模型的特性。
    - Comfy dtype: COMBO['Recursive', 'Weighted']
    - Python dtype: str
- normalise_ratios
    - normalise_ratios参数很重要，因为它指示是否应将比例归一化。这对于确保比例准确反映每个模型对合并结果的预期贡献非常重要。
    - Comfy dtype: COMBO['Yes', 'No']
    - Python dtype: str
- weight_factor
    - 权重因子参数影响合并过程中模型的权重。它对于微调每个模型对最终合并模型的贡献至关重要，允许对结果进行精确控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MODEL
    - MODEL输出提供了应用合并方法和指定参数后得到的合并模型。它代表了节点处理的顶点，对用户的工作流程至关重要。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_management.Model
- CLIP
    - CLIP输出提供了与合并模型相关的CLIP模型。它很重要，因为它使得使用CLIP模型框架进行进一步的处理或分析成为可能。
    - Comfy dtype: CLIP
    - Python dtype: comfy.model_management.CLIP
- model_mix_info
    - model_mix_info输出提供了合并过程的详细报告，包括所使用的模型的名称和比例。这些信息对于理解合并模型的组成和记录合并过程非常有价值。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - show_help输出提供了一个链接到文档的链接，以获得进一步的帮助。对于寻求如何有效使用节点的更多信息的用户来说，这是一个有用的资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ApplyModelMerge:

    @classmethod
    def INPUT_TYPES(s):
        merge_methods = ['Recursive', 'Weighted']
        return {'required': {'model_stack': ('MODEL_STACK',), 'merge_method': (merge_methods,), 'normalise_ratios': (['Yes', 'No'],), 'weight_factor': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'STRING', 'STRING')
    RETURN_NAMES = ('MODEL', 'CLIP', 'model_mix_info', 'show_help')
    FUNCTION = 'merge'
    CATEGORY = icons.get('Comfyroll/Model Merge')

    def merge(self, model_stack, merge_method, normalise_ratios, weight_factor):
        sum_clip_ratio = 0
        sum_model_ratio = 0
        model_mix_info = str('Merge Info:\n')
        if len(model_stack) == 0:
            print(f'[Warning] Apply Model Merge: No active models selected in the model merge stack')
            return ()
        if len(model_stack) == 1:
            print(f'[Warning] Apply Model Merge: Only one active model found in the model merge stack. At least 2 models are normally needed for merging. The active model will be output.')
            (model_name, model_ratio, clip_ratio) = model_stack[0]
            ckpt_path = folder_paths.get_full_path('checkpoints', model_name)
            return comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths('embeddings'))
        for (i, model_tuple) in enumerate(model_stack):
            (model_name, model_ratio, clip_ratio) = model_tuple
            sum_model_ratio += model_ratio
            sum_clip_ratio += clip_ratio
        model_mix_info = model_mix_info + 'Ratios are applied using the Recursive method\n\n'
        for (i, model_tuple) in enumerate(model_stack):
            (model_name, model_ratio, clip_ratio) = model_tuple
            ckpt_path = folder_paths.get_full_path('checkpoints', model_name)
            merge_model = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths('embeddings'))
            print(f'Apply Model Merge: Model Name {model_name}, Model Ratio {model_ratio}, CLIP Ratio {clip_ratio}')
            if sum_model_ratio != 1 and normalise_ratios == 'Yes':
                print(f'[Warning] Apply Model Merge: Sum of model ratios != 1. Ratios will be normalised')
                model_ratio = round(model_ratio / sum_model_ratio, 2)
                clip_ratio = round(clip_ratio / sum_clip_ratio, 2)
            if merge_method == 'Weighted':
                if i == 1:
                    model_ratio = 1 - weight_factor + weight_factor * model_ratio
                    clip_ratio = 1 - weight_factor + weight_factor * clip_ratio
            if i == 0:
                model1 = merge_model[0].clone()
                clip1 = merge_model[1].clone()
                model_mix_info = model_mix_info + 'Base Model Name: ' + model_name
            else:
                model2 = merge_model[0].clone()
                kp = model2.get_key_patches('diffusion_model.')
                for k in kp:
                    model1.add_patches({k: kp[k]}, model_ratio, 1.0 - model_ratio)
                clip2 = merge_model[1].clone()
                kp = clip2.get_key_patches()
                for k in kp:
                    if k.endswith('.position_ids') or k.endswith('.logit_scale'):
                        continue
                    clip1.add_patches({k: kp[k]}, clip_ratio, 1.0 - clip_ratio)
                model_mix_info = model_mix_info + '\nModel Name: ' + model_name + '\nModel Ratio: ' + str(model_ratio) + '\nCLIP Ratio: ' + str(clip_ratio) + '\n'
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Model-Merge-Nodes#cr-apply-model-merge'
        return (model1, clip1, model_mix_info, show_help)
```