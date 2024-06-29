---
tags:
- Prompt
- PromptStyling
---

# Prompt With Style (Mikey)
## Documentation
- Class name: `Prompt With Style V3`
- Category: `Mikey`
- Output node: `False`

The Prompt With Style V3 node is designed to enhance text prompts with predefined styles, allowing for the dynamic integration of style elements into both positive and negative prompts. It processes input prompts by stripping existing style syntax, matching them with available styles, and then reformatting them according to the selected style, including handling of special syntax and wildcards. This node aims to provide a versatile tool for generating styled prompts that can be further customized or used directly in various text-based applications.
## Input types
### Required
- **`positive_prompt`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`negative_prompt`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`ratio_selected`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`custom_size`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`fit_custom_size`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`custom_width`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`custom_height`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`batch_size`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`seed`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`target_mode`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`base_model`**
    - unknown
    - Comfy dtype: `MODEL`
    - Python dtype: `unknown`
- **`clip_base`**
    - unknown
    - Comfy dtype: `CLIP`
    - Python dtype: `unknown`
- **`clip_refiner`**
    - unknown
    - Comfy dtype: `CLIP`
    - Python dtype: `unknown`
## Output types
- **`base_model`**
    - Comfy dtype: `MODEL`
    - unknown
    - Python dtype: `unknown`
- **`samples`**
    - Comfy dtype: `LATENT`
    - unknown
    - Python dtype: `unknown`
- **`base_pos_cond`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`base_neg_cond`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`refiner_pos_cond`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`refiner_neg_cond`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`positive_prompt`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`negative_prompt`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Mikey Sampler Base Only Advanced](../../mikey_nodes/Nodes/Mikey Sampler Base Only Advanced.md)
    - [Save Image With Prompt Data](../../mikey_nodes/Nodes/Save Image With Prompt Data.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [FileNamePrefix](../../mikey_nodes/Nodes/FileNamePrefix.md)
    - [FaceFixerOpenCV](../../mikey_nodes/Nodes/FaceFixerOpenCV.md)
    - [ConditioningAverage](../../Comfy/Nodes/ConditioningAverage.md)



## Source code
```python
class PromptWithStyleV3:
    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        s.ratio_sizes, s.ratio_dict = read_ratios()
        s.styles, s.pos_style, s.neg_style = read_styles()
        s.fit = ['true','false']
        s.custom_size = ['true', 'false']
        return {"required": {"positive_prompt": ("STRING", {"multiline": True, 'default': 'Positive Prompt'}),
                             "negative_prompt": ("STRING", {"multiline": True, 'default': 'Negative Prompt'}),
                             "ratio_selected": (s.ratio_sizes,),
                             "custom_size": (s.custom_size, {"default": "false"}),
                             "fit_custom_size": (s.fit,),
                             "custom_width": ("INT", {"default": 1024, "min": 1, "max": 8192, "step": 1}),
                             "custom_height": ("INT", {"default": 1024, "min": 1, "max": 8192, "step": 1}),
                             "batch_size": ("INT", {"default": 1, "min": 1, "max": 64}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "target_mode": (["match", "2x", "4x", "2x90", "4x90",
                                              "2048","2048-90","4096", "4096-90"], {"default": "4x"}),
                             "base_model": ("MODEL",), "clip_base": ("CLIP",), "clip_refiner": ("CLIP",),
                             },
                "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"},
        }

    RETURN_TYPES = ('MODEL','LATENT',
                    'CONDITIONING','CONDITIONING','CONDITIONING','CONDITIONING',
                    'STRING','STRING')
    RETURN_NAMES = ('base_model','samples',
                    'base_pos_cond','base_neg_cond','refiner_pos_cond','refiner_neg_cond',
                    'positive_prompt','negative_prompt')

    FUNCTION = 'start'
    CATEGORY = 'Mikey'

    def extract_and_load_loras(self, text, model, clip):
        # load loras detected in the prompt text
        # The text for adding LoRA to the prompt, <lora:filename:multiplier>, is only used to enable LoRA, and is erased from prompt afterwards
        # The multiplier is optional, and defaults to 1.0
        # We update the model and clip, and return the new model and clip with the lora prompt stripped from the text
        # If multiple lora prompts are detected we chain them together like: original clip > clip_with_lora1 > clip_with_lora2 > clip_with_lora3 > etc
        lora_re = r'<lora:(.*?)(?::(.*?))?>'
        # find all lora prompts
        lora_prompts = re.findall(lora_re, text)
        stripped_text = text
        # if we found any lora prompts
        if len(lora_prompts) > 0:
            # loop through each lora prompt
            for lora_prompt in lora_prompts:
                # get the lora filename
                lora_filename = lora_prompt[0]
                # check for file extension in filename
                if '.safetensors' not in lora_filename:
                    lora_filename += '.safetensors'
                # get the lora multiplier
                try:
                    lora_multiplier = float(lora_prompt[1]) if lora_prompt[1] != '' else 1.0
                except:
                    lora_multiplier = 1.0
                # apply the lora to the clip using the LoraLoader.load_lora function
                # apply the lora to the clip
                model, clip = load_lora(model, clip, lora_filename, lora_multiplier, lora_multiplier)
                stripped_text = stripped_text.replace(f'<lora:{lora_filename}:{lora_multiplier}>', '')
                stripped_text = stripped_text.replace(f'<lora:{lora_filename}>', '')
        return model, clip, stripped_text

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
        return pos_prompt, neg_prompt

    def start(self, base_model, clip_base, clip_refiner, positive_prompt, negative_prompt, ratio_selected, batch_size, seed,
              custom_size='false', fit_custom_size='false', custom_width=1024, custom_height=1024, target_mode='match',
              unique_id=None, extra_pnginfo=None, prompt=None):
        if extra_pnginfo is None:
            extra_pnginfo = {'PromptWithStyle': {}}

        prompt_with_style = extra_pnginfo.get('PromptWithStyle', {})

        add_metadata_to_dict(prompt_with_style, positive_prompt=positive_prompt, negative_prompt=negative_prompt,
                            ratio_selected=ratio_selected, batch_size=batch_size, seed=seed, custom_size=custom_size,
                            fit_custom_size=fit_custom_size, custom_width=custom_width, custom_height=custom_height,
                            target_mode=target_mode)

        if custom_size == 'true':
            if fit_custom_size == 'true':
                if custom_width == 1 and custom_height == 1:
                    width, height = 1024, 1024
                if custom_width == custom_height:
                    width, height = 1024, 1024
                if f'{custom_width}:{custom_height}' in self.ratio_dict:
                    width, height = self.ratio_dict[f'{custom_width}:{custom_height}']
                else:
                    width, height = find_latent_size(custom_width, custom_height)
            else:
                width, height = custom_width, custom_height
        else:
            width = self.ratio_dict[ratio_selected]["width"]
            height = self.ratio_dict[ratio_selected]["height"]

        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        #print(batch_size, 4, height // 8, width // 8)
        # calculate dimensions for target_width, target height (base) and refiner_width, refiner_height (refiner)
        ratio = min([width, height]) / max([width, height])
        if target_mode == 'match':
            target_width, target_height = width, height
            refiner_width, refiner_height = width * 4, height * 4
            #refiner_width, refiner_height = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        elif target_mode == '2x':
            target_width, target_height = width * 2, height * 2
            refiner_width, refiner_height = width * 4, height * 4
            #refiner_width, refiner_height = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        elif target_mode == '4x':
            target_width, target_height = width * 4, height * 4
            refiner_width, refiner_height = width * 4, height * 4
            #refiner_width, refiner_height = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        elif target_mode == '2x90':
            target_width, target_height = height * 2, width * 2
            refiner_width, refiner_height = width * 4, height * 4
            #refiner_width, refiner_height = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        elif target_mode == '4x90':
            target_width, target_height = height * 4, width * 4
            refiner_width, refiner_height = width * 4, height * 4
            #refiner_width, refiner_height = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        elif target_mode == '4096':
            target_width, target_height = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
            refiner_width, refiner_height = width * 4, height * 4
            #refiner_width, refiner_height = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        elif target_mode == '4096-90':
            target_width, target_height = (4096, 4096 * ratio // 8 * 8) if width < height else (4096 * ratio // 8 * 8, 4096)
            refiner_width, refiner_height = width * 4, height * 4
            #refiner_width, refiner_height = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        elif target_mode == '2048':
            target_width, target_height = (2048, 2048 * ratio // 8 * 8) if width > height else (2048 * ratio // 8 * 8, 2048)
            refiner_width, refiner_height = width * 4, height * 4
            #refiner_width, refiner_height = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        elif target_mode == '2048-90':
            target_width, target_height = (2048, 2048 * ratio // 8 * 8) if width < height else (2048 * ratio // 8 * 8, 2048)
            refiner_width, refiner_height = width * 4, height * 4
            #refiner_width, refiner_height = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        #print('Width:', width, 'Height:', height,
        #      'Target Width:', target_width, 'Target Height:', target_height,
        #      'Refiner Width:', refiner_width, 'Refiner Height:', refiner_height)
        add_metadata_to_dict(prompt_with_style, width=width, height=height, target_width=target_width, target_height=target_height,
                             refiner_width=refiner_width, refiner_height=refiner_height, crop_w=0, crop_h=0)
        # search and replace
        positive_prompt = search_and_replace(positive_prompt, extra_pnginfo, prompt)
        negative_prompt = search_and_replace(negative_prompt, extra_pnginfo, prompt)

        # process random syntax
        positive_prompt = process_random_syntax(positive_prompt, seed)
        negative_prompt = process_random_syntax(negative_prompt, seed)

        # check for $style in prompt, split the prompt into prompt and style
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

        # first process wildcards
        positive_prompt_ = find_and_replace_wildcards(positive_prompt, seed, True)
        negative_prompt_ = find_and_replace_wildcards(negative_prompt, seed, True)
        add_metadata_to_dict(prompt_with_style, positive_prompt=positive_prompt_, negative_prompt=negative_prompt_)
        if len(positive_prompt_) != len(positive_prompt) or len(negative_prompt_) != len(negative_prompt):
            seed += random.randint(0, 1000000)
        positive_prompt = positive_prompt_
        negative_prompt = negative_prompt_
        # extract and load loras
        base_model, clip_base_pos, pos_prompt = self.extract_and_load_loras(positive_prompt, base_model, clip_base)
        base_model, clip_base_neg, neg_prompt = self.extract_and_load_loras(negative_prompt, base_model, clip_base)
        # find and replace style syntax
        # <style:style_name> will update the selected style
        style_re = r'<style:(.*?)>'
        pos_style_prompts = re.findall(style_re, pos_prompt)
        neg_style_prompts = re.findall(style_re, neg_prompt)
        # concat style prompts
        style_prompts = pos_style_prompts + neg_style_prompts
        #print(style_prompts)
        base_pos_conds = []
        base_neg_conds = []
        refiner_pos_conds = []
        refiner_neg_conds = []
        if len(style_prompts) == 0:
            style_ = 'none'
            pos_prompt_, neg_prompt_ = self.parse_prompts(positive_prompt, negative_prompt, style_, seed)
            pos_style_, neg_style_ = pos_prompt_, neg_prompt_
            pos_prompt_, neg_prompt_ = strip_all_syntax(pos_prompt_), strip_all_syntax(neg_prompt_)
            pos_style_, neg_style_ = strip_all_syntax(pos_style_), strip_all_syntax(neg_style_)
            #print("pos_prompt_", pos_prompt_)
            #print("neg_prompt_", neg_prompt_)
            #print("pos_style_", pos_style_)
            #print("neg_style_", neg_style_)
            # encode text
            add_metadata_to_dict(prompt_with_style, style=style_, clip_g_positive=pos_prompt, clip_l_positive=pos_style_)
            add_metadata_to_dict(prompt_with_style, clip_g_negative=neg_prompt, clip_l_negative=neg_style_)
            sdxl_pos_cond = CLIPTextEncodeSDXL.encode(self, clip_base_pos, width, height, 0, 0, target_width, target_height, pos_prompt_, pos_style_)[0]
            sdxl_neg_cond = CLIPTextEncodeSDXL.encode(self, clip_base_neg, width, height, 0, 0, target_width, target_height, neg_prompt_, neg_style_)[0]
            refiner_pos_cond = CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 6, refiner_width, refiner_height, pos_prompt_)[0]
            refiner_neg_cond = CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 2.5, refiner_width, refiner_height, neg_prompt_)[0]
            #prompt.get(str(unique_id))['inputs']['output_positive_prompt'] = pos_prompt_
            #prompt.get(str(unique_id))['inputs']['output_negative_prompt'] = neg_prompt_
            #prompt.get(str(unique_id))['inputs']['output_latent_width'] = width
            #prompt.get(str(unique_id))['inputs']['output_latent_height'] = height
            #prompt.get(str(unique_id))['inputs']['output_target_width'] = target_width
            #prompt.get(str(unique_id))['inputs']['output_target_height'] = target_height
            #prompt.get(str(unique_id))['inputs']['output_refiner_width'] = refiner_width
            #prompt.get(str(unique_id))['inputs']['output_refiner_height'] = refiner_height
            #prompt.get(str(unique_id))['inputs']['output_crop_w'] = 0
            #prompt.get(str(unique_id))['inputs']['output_crop_h'] = 0
            return (base_model, {"samples":latent},
                    sdxl_pos_cond, sdxl_neg_cond,
                    refiner_pos_cond, refiner_neg_cond,
                    pos_prompt_, neg_prompt_, {'extra_pnginfo': extra_pnginfo})

        for style_prompt in style_prompts:
            """ get output from PromptWithStyle.start """
            # strip all style syntax from prompt
            style_ = style_prompt
            #print(style_ in self.styles)
            if style_ not in self.styles:
                # try to match a key without being case sensitive
                style_search = next((x for x in self.styles if x.lower() == style_.lower()), None)
                # if there are still no matches
                if style_search is None:
                    #print(f'Could not find style: {style_}')
                    style_ = 'none'
                    continue
                else:
                    style_ = style_search
            pos_prompt_ = re.sub(style_re, '', pos_prompt)
            neg_prompt_ = re.sub(style_re, '', neg_prompt)
            pos_prompt_, neg_prompt_ = self.parse_prompts(pos_prompt_, neg_prompt_, style_, seed)
            pos_style_, neg_style_ = str(self.pos_style[style_]), str(self.neg_style[style_])
            pos_prompt_, neg_prompt_ = strip_all_syntax(pos_prompt_), strip_all_syntax(neg_prompt_)
            pos_style_, neg_style_ = strip_all_syntax(pos_style_), strip_all_syntax(neg_style_)
            add_metadata_to_dict(prompt_with_style, style=style_, positive_prompt=pos_prompt_, negative_prompt=neg_prompt_,
                                 positive_style=pos_style_, negative_style=neg_style_)
            #base_model, clip_base_pos, pos_prompt_ = self.extract_and_load_loras(pos_prompt_, base_model, clip_base)
            #base_model, clip_base_neg, neg_prompt_ = self.extract_and_load_loras(neg_prompt_, base_model, clip_base)
            width_, height_ = width, height
            refiner_width_, refiner_height_ = refiner_width, refiner_height
            # encode text
            add_metadata_to_dict(prompt_with_style, style=style_, clip_g_positive=pos_prompt_, clip_l_positive=pos_style_)
            add_metadata_to_dict(prompt_with_style, clip_g_negative=neg_prompt_, clip_l_negative=neg_style_)
            base_pos_conds.append(CLIPTextEncodeSDXL.encode(self, clip_base_pos, width_, height_, 0, 0, target_width, target_height, pos_prompt_, pos_style_)[0])
            base_neg_conds.append(CLIPTextEncodeSDXL.encode(self, clip_base_neg, width_, height_, 0, 0, target_width, target_height, neg_prompt_, neg_style_)[0])
            refiner_pos_conds.append(CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 6, refiner_width_, refiner_height_, pos_prompt_)[0])
            refiner_neg_conds.append(CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 2.5, refiner_width_, refiner_height_, neg_prompt_)[0])
        # if none of the styles matched we will get an empty list so we need to check for that again
        if len(base_pos_conds) == 0:
            style_ = 'none'
            pos_prompt_, neg_prompt_ = self.parse_prompts(positive_prompt, negative_prompt, style_, seed)
            pos_style_, neg_style_ = pos_prompt_, neg_prompt_
            pos_prompt_, neg_prompt_ = strip_all_syntax(pos_prompt_), strip_all_syntax(neg_prompt_)
            pos_style_, neg_style_ = strip_all_syntax(pos_style_), strip_all_syntax(neg_style_)
            # encode text
            add_metadata_to_dict(prompt_with_style, style=style_, clip_g_positive=pos_prompt_, clip_l_positive=pos_style_)
            add_metadata_to_dict(prompt_with_style, clip_g_negative=neg_prompt_, clip_l_negative=neg_style_)
            sdxl_pos_cond = CLIPTextEncodeSDXL.encode(self, clip_base_pos, width, height, 0, 0, target_width, target_height, pos_prompt_, pos_style_)[0]
            sdxl_neg_cond = CLIPTextEncodeSDXL.encode(self, clip_base_neg, width, height, 0, 0, target_width, target_height, neg_prompt_, neg_style_)[0]
            refiner_pos_cond = CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 6, refiner_width, refiner_height, pos_prompt_)[0]
            refiner_neg_cond = CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 2.5, refiner_width, refiner_height, neg_prompt_)[0]
            #prompt.get(str(unique_id))['inputs']['output_positive_prompt'] = pos_prompt_
            #prompt.get(str(unique_id))['inputs']['output_negative_prompt'] = neg_prompt_
            #prompt.get(str(unique_id))['inputs']['output_latent_width'] = width
            #prompt.get(str(unique_id))['inputs']['output_latent_height'] = height
            #prompt.get(str(unique_id))['inputs']['output_target_width'] = target_width
            #prompt.get(str(unique_id))['inputs']['output_target_height'] = target_height
            #prompt.get(str(unique_id))['inputs']['output_refiner_width'] = refiner_width
            #prompt.get(str(unique_id))['inputs']['output_refiner_height'] = refiner_height
            #prompt.get(str(unique_id))['inputs']['output_crop_w'] = 0
            #prompt.get(str(unique_id))['inputs']['output_crop_h'] = 0
            return (base_model, {"samples":latent},
                    sdxl_pos_cond, sdxl_neg_cond,
                    refiner_pos_cond, refiner_neg_cond,
                    pos_prompt_, neg_prompt_, {'extra_pnginfo': extra_pnginfo})
        # loop through conds and add them together
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
        # return
        extra_pnginfo['PromptWithStyle'] = prompt_with_style
        #prompt.get(str(unique_id))['inputs']['output_positive_prompt'] = pos_prompt_
        #prompt.get(str(unique_id))['inputs']['output_negative_prompt'] = neg_prompt_
        #prompt.get(str(unique_id))['inputs']['output_latent_width'] = width
        #prompt.get(str(unique_id))['inputs']['output_latent_height'] = height
        #prompt.get(str(unique_id))['inputs']['output_target_width'] = target_width
        #prompt.get(str(unique_id))['inputs']['output_target_height'] = target_height
        #prompt.get(str(unique_id))['inputs']['output_refiner_width'] = refiner_width
        #prompt.get(str(unique_id))['inputs']['output_refiner_height'] = refiner_height
        #prompt.get(str(unique_id))['inputs']['output_crop_w'] = 0
        #prompt.get(str(unique_id))['inputs']['output_crop_h'] = 0
        return (base_model, {"samples":latent},
                sdxl_pos_cond, sdxl_neg_cond,
                refiner_pos_cond, refiner_neg_cond,
                pos_prompt_, neg_prompt_, {'extra_pnginfo': extra_pnginfo})

```
