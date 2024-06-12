# Documentation
- Class name: PromptWithStyleV3
- Category: Mikey
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

PromptWithStyleV3节点旨在基于正面和负面提示的组合以及可选的风格规格生成图像样本。它管理将风格和条件融入图像生成过程的复杂性，提供了一种无缝的方式来根据所需特征影响输出。该节点抽象了应用风格和条件采样的复杂性，为用户提供了一个简单的界面来实现风格化的图像合成。

# Input types
## Required
- positive_prompt
    - 正面提示是一种描述性文本，指导图像生成朝着期望的特征发展。它在引导创作过程朝着与用户愿景一致的图像产生方面起着至关重要的作用。节点依赖正面提示来确定在生成的图像中应该强调哪些方面。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - 负面提示作为正面提示的对立面，指导图像生成避免不需要的特征或元素。它是一个重要的参数，用于微调输出并确保生成的图像排除用户希望避免的某些特征。
    - Comfy dtype: STRING
    - Python dtype: str
- ratio_selected
    - 选定的比率参数决定了生成图像的宽高比。它是设置输出尺寸的关键因素，允许用户从一系列预定义的比率中选择或指定自定义比率，以控制生成图像的形状。
    - Comfy dtype: COMBO[INT]
    - Python dtype: List[int]
## Optional
- custom_size
    - 自定义尺寸输入允许用户为生成的图像指定非标准尺寸。启用时，用户可以输入自定义的宽度和高度，使他们可以完全控制输出图像的尺寸，这对于特定的显示要求或设计限制非常有用。
    - Comfy dtype: STRING
    - Python dtype: str
- fit_custom_size
    - 适应自定义尺寸参数与自定义尺寸输入一起使用，以确定生成的图像应如何适应指定的尺寸。它决定了图像是否应该缩放以适应或裁剪以匹配用户提供的确切尺寸。
    - Comfy dtype: STRING
    - Python dtype: str
- custom_width
    - 当启用自定义图像尺寸时，自定义宽度参数设置生成图像的宽度。它与自定义高度参数协同工作，以定义输出的确切尺寸，允许对图像的宽度进行精确控制。
    - Comfy dtype: INT
    - Python dtype: int
- custom_height
    - 自定义高度参数与自定义宽度一起使用，确定生成图像的垂直尺寸。当输出需要特定的高度要求时，它特别有用，使用户能够精确控制图像的高度。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 批次大小参数定义了单次处理中生成的图像数量。它是管理计算资源的重要因素，可以影响图像生成过程的效率。调整批次大小可以帮助在性能和一次生成的图像数量之间取得平衡。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 种子参数用于在图像生成过程中引入随机性。它确保使用相同种子的每次运行产生一组确定的图像，这对于获得一致的结果或通过实验微调生成过程非常有用。
    - Comfy dtype: INT
    - Python dtype: int
- target_mode
    - 目标模式参数指定了生成图像的缩放策略。它允许用户选择不同的缩放选项，例如加倍或四倍大小，这可能会影响输出图像的细节水平和整体外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- base_model
    - 基础模型参数指的是用于图像生成的底层模型。它是一个关键组件，决定了生成图像的质量和风格。用户可以从一系列预训练模型中选择，以实现不同的艺术效果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip_base
    - CLIP基础参数与用于文本到图像转换的CLIP模型相关联。它在文本提示如何被解释和转换为视觉元素中起着重要作用。CLIP基础的选择可以影响生成图像的主题连贯性和风格细节。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- clip_refiner
    - CLIP细化参数用于通过应用次级处理步骤来提高生成图像的质量。它是一个可选组件，可以为用户提供对输出的细微细节和风格元素的额外控制，使用户能够实现更精致和细化的结果。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module

# Output types
- base_model
    - 基础模型输出提供了用于图像生成过程的底层模型。它是一个关键组件，定义了图像合成任务的基础架构和能力。此输出可用于进一步处理或分析模型本身。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- samples
    - 样本输出包含生成的图像样本，这是图像生成过程的主要结果。这些样本体现了输入提示和风格的视觉效果，提供了可以查看、展示或进一步操作的有形结果。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- base_pos_cond
    - 基础正面条件输出代表了从基础模型派生的正面条件向量。它用于指导图像生成过程，以产生与提示中指定的正面方面相符的图像。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- base_neg_cond
    - 基础负面条件输出是帮助将图像生成引导远离不需要的特征的负面条件向量。它是确保生成的图像不包含与用户偏好不一致的元素的重要部分。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- refiner_pos_cond
    - 细化正面条件输出是在图像生成的次级处理步骤中应用的增强正面条件向量。它用于进一步细化图像，确保它们与期望的正面属性紧密匹配。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- refiner_neg_cond
    - 细化负面条件输出是用于微调图像生成过程并排除更复杂的不需要特征的增强负面条件向量。它有助于在最终输出图像中实现更高水平的细节和精度。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- positive_prompt
    - 正面提示输出反映了在图像生成中使用的已处理正面提示文本。它是指导模型创建具有所需特征的图像的文本输入，可用于参考或进一步分析。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - 负面提示输出是帮助通过避免某些特征来塑造图像生成的已处理负面提示文本。它是确保生成的图像遵守用户约束并且不包含不需要的元素的关键组件。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class PromptWithStyleV3:

    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        (s.ratio_sizes, s.ratio_dict) = read_ratios()
        (s.styles, s.pos_style, s.neg_style) = read_styles()
        s.fit = ['true', 'false']
        s.custom_size = ['true', 'false']
        return {'required': {'positive_prompt': ('STRING', {'multiline': True, 'default': 'Positive Prompt'}), 'negative_prompt': ('STRING', {'multiline': True, 'default': 'Negative Prompt'}), 'ratio_selected': (s.ratio_sizes,), 'custom_size': (s.custom_size, {'default': 'false'}), 'fit_custom_size': (s.fit,), 'custom_width': ('INT', {'default': 1024, 'min': 1, 'max': 8192, 'step': 1}), 'custom_height': ('INT', {'default': 1024, 'min': 1, 'max': 8192, 'step': 1}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'target_mode': (['match', '2x', '4x', '2x90', '4x90', '2048', '2048-90', '4096', '4096-90'], {'default': '4x'}), 'base_model': ('MODEL',), 'clip_base': ('CLIP',), 'clip_refiner': ('CLIP',)}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('MODEL', 'LATENT', 'CONDITIONING', 'CONDITIONING', 'CONDITIONING', 'CONDITIONING', 'STRING', 'STRING')
    RETURN_NAMES = ('base_model', 'samples', 'base_pos_cond', 'base_neg_cond', 'refiner_pos_cond', 'refiner_neg_cond', 'positive_prompt', 'negative_prompt')
    FUNCTION = 'start'
    CATEGORY = 'Mikey'

    def extract_and_load_loras(self, text, model, clip):
        lora_re = '<lora:(.*?)(?::(.*?))?>'
        lora_prompts = re.findall(lora_re, text)
        stripped_text = text
        if len(lora_prompts) > 0:
            for lora_prompt in lora_prompts:
                lora_filename = lora_prompt[0]
                if '.safetensors' not in lora_filename:
                    lora_filename += '.safetensors'
                try:
                    lora_multiplier = float(lora_prompt[1]) if lora_prompt[1] != '' else 1.0
                except:
                    lora_multiplier = 1.0
                (model, clip) = load_lora(model, clip, lora_filename, lora_multiplier, lora_multiplier)
                stripped_text = stripped_text.replace(f'<lora:{lora_filename}:{lora_multiplier}>', '')
                stripped_text = stripped_text.replace(f'<lora:{lora_filename}>', '')
        return (model, clip, stripped_text)

    def parse_prompts(self, positive_prompt, negative_prompt, style, seed):
        positive_prompt = find_and_replace_wildcards(positive_prompt, seed, debug=True)
        negative_prompt = find_and_replace_wildcards(negative_prompt, seed, debug=True)
        if '{prompt}' in self.pos_style[style]:
            positive_prompt = self.pos_style[style].replace('{prompt}', positive_prompt)
        if positive_prompt == '' or positive_prompt == 'Positive Prompt' or positive_prompt is None:
            pos_prompt = self.pos_style[style]
        else:
            pos_prompt = positive_prompt + ', ' + self.pos_style[style]
        if negative_prompt == '' or negative_prompt == 'Negative Prompt' or negative_prompt is None:
            neg_prompt = self.neg_style[style]
        else:
            neg_prompt = negative_prompt + ', ' + self.neg_style[style]
        return (pos_prompt, neg_prompt)

    def start(self, base_model, clip_base, clip_refiner, positive_prompt, negative_prompt, ratio_selected, batch_size, seed, custom_size='false', fit_custom_size='false', custom_width=1024, custom_height=1024, target_mode='match', unique_id=None, extra_pnginfo=None, prompt=None):
        if extra_pnginfo is None:
            extra_pnginfo = {'PromptWithStyle': {}}
        prompt_with_style = extra_pnginfo.get('PromptWithStyle', {})
        add_metadata_to_dict(prompt_with_style, positive_prompt=positive_prompt, negative_prompt=negative_prompt, ratio_selected=ratio_selected, batch_size=batch_size, seed=seed, custom_size=custom_size, fit_custom_size=fit_custom_size, custom_width=custom_width, custom_height=custom_height, target_mode=target_mode)
        if custom_size == 'true':
            if fit_custom_size == 'true':
                if custom_width == 1 and custom_height == 1:
                    (width, height) = (1024, 1024)
                if custom_width == custom_height:
                    (width, height) = (1024, 1024)
                if f'{custom_width}:{custom_height}' in self.ratio_dict:
                    (width, height) = self.ratio_dict[f'{custom_width}:{custom_height}']
                else:
                    (width, height) = find_latent_size(custom_width, custom_height)
            else:
                (width, height) = (custom_width, custom_height)
        else:
            width = self.ratio_dict[ratio_selected]['width']
            height = self.ratio_dict[ratio_selected]['height']
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        ratio = min([width, height]) / max([width, height])
        if target_mode == 'match':
            (target_width, target_height) = (width, height)
            (refiner_width, refiner_height) = (width * 4, height * 4)
        elif target_mode == '2x':
            (target_width, target_height) = (width * 2, height * 2)
            (refiner_width, refiner_height) = (width * 4, height * 4)
        elif target_mode == '4x':
            (target_width, target_height) = (width * 4, height * 4)
            (refiner_width, refiner_height) = (width * 4, height * 4)
        elif target_mode == '2x90':
            (target_width, target_height) = (height * 2, width * 2)
            (refiner_width, refiner_height) = (width * 4, height * 4)
        elif target_mode == '4x90':
            (target_width, target_height) = (height * 4, width * 4)
            (refiner_width, refiner_height) = (width * 4, height * 4)
        elif target_mode == '4096':
            (target_width, target_height) = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
            (refiner_width, refiner_height) = (width * 4, height * 4)
        elif target_mode == '4096-90':
            (target_width, target_height) = (4096, 4096 * ratio // 8 * 8) if width < height else (4096 * ratio // 8 * 8, 4096)
            (refiner_width, refiner_height) = (width * 4, height * 4)
        elif target_mode == '2048':
            (target_width, target_height) = (2048, 2048 * ratio // 8 * 8) if width > height else (2048 * ratio // 8 * 8, 2048)
            (refiner_width, refiner_height) = (width * 4, height * 4)
        elif target_mode == '2048-90':
            (target_width, target_height) = (2048, 2048 * ratio // 8 * 8) if width < height else (2048 * ratio // 8 * 8, 2048)
            (refiner_width, refiner_height) = (width * 4, height * 4)
        add_metadata_to_dict(prompt_with_style, width=width, height=height, target_width=target_width, target_height=target_height, refiner_width=refiner_width, refiner_height=refiner_height, crop_w=0, crop_h=0)
        positive_prompt = search_and_replace(positive_prompt, extra_pnginfo, prompt)
        negative_prompt = search_and_replace(negative_prompt, extra_pnginfo, prompt)
        positive_prompt = process_random_syntax(positive_prompt, seed)
        negative_prompt = process_random_syntax(negative_prompt, seed)
        user_added_style = False
        if '$style' in positive_prompt:
            self.styles.append('user_added_style')
            self.pos_style['user_added_style'] = positive_prompt.split('$style')[1].strip()
            self.neg_style['user_added_style'] = ''
            user_added_style = True
        if '$style' in negative_prompt:
            if 'user_added_style' not in self.styles:
                self.styles.append('user_added_style')
            self.neg_style['user_added_style'] = negative_prompt.split('$style')[1].strip()
            user_added_style = True
        if user_added_style:
            positive_prompt = positive_prompt.split('$style')[0].strip()
            if '$style' in negative_prompt:
                negative_prompt = negative_prompt.split('$style')[0].strip()
            positive_prompt = positive_prompt + '<style:user_added_style>'
        positive_prompt_ = find_and_replace_wildcards(positive_prompt, seed, True)
        negative_prompt_ = find_and_replace_wildcards(negative_prompt, seed, True)
        add_metadata_to_dict(prompt_with_style, positive_prompt=positive_prompt_, negative_prompt=negative_prompt_)
        if len(positive_prompt_) != len(positive_prompt) or len(negative_prompt_) != len(negative_prompt):
            seed += random.randint(0, 1000000)
        positive_prompt = positive_prompt_
        negative_prompt = negative_prompt_
        (base_model, clip_base_pos, pos_prompt) = self.extract_and_load_loras(positive_prompt, base_model, clip_base)
        (base_model, clip_base_neg, neg_prompt) = self.extract_and_load_loras(negative_prompt, base_model, clip_base)
        style_re = '<style:(.*?)>'
        pos_style_prompts = re.findall(style_re, pos_prompt)
        neg_style_prompts = re.findall(style_re, neg_prompt)
        style_prompts = pos_style_prompts + neg_style_prompts
        base_pos_conds = []
        base_neg_conds = []
        refiner_pos_conds = []
        refiner_neg_conds = []
        if len(style_prompts) == 0:
            style_ = 'none'
            (pos_prompt_, neg_prompt_) = self.parse_prompts(positive_prompt, negative_prompt, style_, seed)
            (pos_style_, neg_style_) = (pos_prompt_, neg_prompt_)
            (pos_prompt_, neg_prompt_) = (strip_all_syntax(pos_prompt_), strip_all_syntax(neg_prompt_))
            (pos_style_, neg_style_) = (strip_all_syntax(pos_style_), strip_all_syntax(neg_style_))
            add_metadata_to_dict(prompt_with_style, style=style_, clip_g_positive=pos_prompt, clip_l_positive=pos_style_)
            add_metadata_to_dict(prompt_with_style, clip_g_negative=neg_prompt, clip_l_negative=neg_style_)
            sdxl_pos_cond = CLIPTextEncodeSDXL.encode(self, clip_base_pos, width, height, 0, 0, target_width, target_height, pos_prompt_, pos_style_)[0]
            sdxl_neg_cond = CLIPTextEncodeSDXL.encode(self, clip_base_neg, width, height, 0, 0, target_width, target_height, neg_prompt_, neg_style_)[0]
            refiner_pos_cond = CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 6, refiner_width, refiner_height, pos_prompt_)[0]
            refiner_neg_cond = CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 2.5, refiner_width, refiner_height, neg_prompt_)[0]
            return (base_model, {'samples': latent}, sdxl_pos_cond, sdxl_neg_cond, refiner_pos_cond, refiner_neg_cond, pos_prompt_, neg_prompt_, {'extra_pnginfo': extra_pnginfo})
        for style_prompt in style_prompts:
            ' get output from PromptWithStyle.start '
            style_ = style_prompt
            if style_ not in self.styles:
                style_search = next((x for x in self.styles if x.lower() == style_.lower()), None)
                if style_search is None:
                    style_ = 'none'
                    continue
                else:
                    style_ = style_search
            pos_prompt_ = re.sub(style_re, '', pos_prompt)
            neg_prompt_ = re.sub(style_re, '', neg_prompt)
            (pos_prompt_, neg_prompt_) = self.parse_prompts(pos_prompt_, neg_prompt_, style_, seed)
            (pos_style_, neg_style_) = (str(self.pos_style[style_]), str(self.neg_style[style_]))
            (pos_prompt_, neg_prompt_) = (strip_all_syntax(pos_prompt_), strip_all_syntax(neg_prompt_))
            (pos_style_, neg_style_) = (strip_all_syntax(pos_style_), strip_all_syntax(neg_style_))
            add_metadata_to_dict(prompt_with_style, style=style_, positive_prompt=pos_prompt_, negative_prompt=neg_prompt_, positive_style=pos_style_, negative_style=neg_style_)
            (width_, height_) = (width, height)
            (refiner_width_, refiner_height_) = (refiner_width, refiner_height)
            add_metadata_to_dict(prompt_with_style, style=style_, clip_g_positive=pos_prompt_, clip_l_positive=pos_style_)
            add_metadata_to_dict(prompt_with_style, clip_g_negative=neg_prompt_, clip_l_negative=neg_style_)
            base_pos_conds.append(CLIPTextEncodeSDXL.encode(self, clip_base_pos, width_, height_, 0, 0, target_width, target_height, pos_prompt_, pos_style_)[0])
            base_neg_conds.append(CLIPTextEncodeSDXL.encode(self, clip_base_neg, width_, height_, 0, 0, target_width, target_height, neg_prompt_, neg_style_)[0])
            refiner_pos_conds.append(CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 6, refiner_width_, refiner_height_, pos_prompt_)[0])
            refiner_neg_conds.append(CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 2.5, refiner_width_, refiner_height_, neg_prompt_)[0])
        if len(base_pos_conds) == 0:
            style_ = 'none'
            (pos_prompt_, neg_prompt_) = self.parse_prompts(positive_prompt, negative_prompt, style_, seed)
            (pos_style_, neg_style_) = (pos_prompt_, neg_prompt_)
            (pos_prompt_, neg_prompt_) = (strip_all_syntax(pos_prompt_), strip_all_syntax(neg_prompt_))
            (pos_style_, neg_style_) = (strip_all_syntax(pos_style_), strip_all_syntax(neg_style_))
            add_metadata_to_dict(prompt_with_style, style=style_, clip_g_positive=pos_prompt_, clip_l_positive=pos_style_)
            add_metadata_to_dict(prompt_with_style, clip_g_negative=neg_prompt_, clip_l_negative=neg_style_)
            sdxl_pos_cond = CLIPTextEncodeSDXL.encode(self, clip_base_pos, width, height, 0, 0, target_width, target_height, pos_prompt_, pos_style_)[0]
            sdxl_neg_cond = CLIPTextEncodeSDXL.encode(self, clip_base_neg, width, height, 0, 0, target_width, target_height, neg_prompt_, neg_style_)[0]
            refiner_pos_cond = CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 6, refiner_width, refiner_height, pos_prompt_)[0]
            refiner_neg_cond = CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 2.5, refiner_width, refiner_height, neg_prompt_)[0]
            return (base_model, {'samples': latent}, sdxl_pos_cond, sdxl_neg_cond, refiner_pos_cond, refiner_neg_cond, pos_prompt_, neg_prompt_, {'extra_pnginfo': extra_pnginfo})
        sdxl_pos_cond = base_pos_conds[0]
        weight = 1
        if len(base_pos_conds) > 1:
            for i in range(1, len(base_pos_conds)):
                weight += 1
                sdxl_pos_cond = ConditioningAverage.addWeighted(self, base_pos_conds[i], sdxl_pos_cond, 1 / weight)[0]
        sdxl_neg_cond = base_neg_conds[0]
        weight = 1
        if len(base_neg_conds) > 1:
            for i in range(1, len(base_neg_conds)):
                weight += 1
                sdxl_neg_cond = ConditioningAverage.addWeighted(self, base_neg_conds[i], sdxl_neg_cond, 1 / weight)[0]
        refiner_pos_cond = refiner_pos_conds[0]
        weight = 1
        if len(refiner_pos_conds) > 1:
            for i in range(1, len(refiner_pos_conds)):
                weight += 1
                refiner_pos_cond = ConditioningAverage.addWeighted(self, refiner_pos_conds[i], refiner_pos_cond, 1 / weight)[0]
        refiner_neg_cond = refiner_neg_conds[0]
        weight = 1
        if len(refiner_neg_conds) > 1:
            for i in range(1, len(refiner_neg_conds)):
                weight += 1
                refiner_neg_cond = ConditioningAverage.addWeighted(self, refiner_neg_conds[i], refiner_neg_cond, 1 / weight)[0]
        extra_pnginfo['PromptWithStyle'] = prompt_with_style
        return (base_model, {'samples': latent}, sdxl_pos_cond, sdxl_neg_cond, refiner_pos_cond, refiner_neg_cond, pos_prompt_, neg_prompt_, {'extra_pnginfo': extra_pnginfo})
```