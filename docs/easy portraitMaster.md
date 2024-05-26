# Documentation
- Class name: portraitMaster
- Category: EasyUse/Prompt
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

portraitMaster节点旨在基于一组全面的参数生成详细的肖像生成提示。它通过结合各种属性，如面部特征、表情和光照条件，在输出中实现高度的定制化和真实感，从而封装了肖像生成的本质。

# Input types
## Required
- shot
    - “shot”参数对于定义要生成的肖像类型至关重要。它影响图像的整体构图和框架，这对于捕捉所需的美学和叙述至关重要。
    - Comfy dtype: COMBO
    - Python dtype: List[str]
## Optional
- gender
    - “gender”参数对于指导肖像主体的生成至关重要。它有助于确定与所选性别相符的物理特征和表情细节，有助于提高肖像的真实性和可信度。
    - Comfy dtype: COMBO
    - Python dtype: List[str]
- age
    - “age”参数在决定肖像主体的外观中起着重要作用。它影响面部特征、皮肤细节和其他与年龄相关的属性的渲染，确保肖像准确地反映所选年龄组。
    - Comfy dtype: INT
    - Python dtype: int
- nationality_1
    - “nationality_1”参数与“nationality_2”参数一起，有助于定义肖像主体的文化和种族背景。这为生成的肖像增添了多样性和丰富性，增加了深度和背景的层次。
    - Comfy dtype: COMBO
    - Python dtype: List[str]
- facial_expression
    - “facial_expression”参数对于传达肖像主体的情感状态至关重要。它指导生成与所选情感相匹配的面部特征和表情，增强了肖像的情感影响力和叙事性。
    - Comfy dtype: COMBO
    - Python dtype: List[str]

# Output types
- prompt
    - “prompt”输出是一个综合性的字符串，将所有输入参数整合成一个连贯且结构化的格式。它作为肖像生成过程的基础，确保最终图像中捕捉到预期的细节和细微差别。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - “negative_prompt”输出是一个补充性字符串，提供了精炼肖像的额外指令。它解决了应该最小化或避免的方面，有助于提高生成图像的整体质量和准确性。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class portraitMaster:

    @classmethod
    def INPUT_TYPES(s):
        max_float_value = 1.95
        prompt_path = os.path.join(RESOURCES_DIR, 'portrait_prompt.json')
        if not os.path.exists(prompt_path):
            response = urlopen('https://raw.githubusercontent.com/yolain/ComfyUI-Easy-Use/main/resources/portrait_prompt.json')
            temp_prompt = json.loads(response.read())
            prompt_serialized = json.dumps(temp_prompt, indent=4)
            with open(prompt_path, 'w') as f:
                f.write(prompt_serialized)
            del response, temp_prompt
        with open(prompt_path, 'r') as f:
            list = json.load(f)
        keys = [['shot', 'COMBO', {'key': 'shot_list'}], ['shot_weight', 'FLOAT'], ['gender', 'COMBO', {'default': 'Woman', 'key': 'gender_list'}], ['age', 'INT', {'default': 30, 'min': 18, 'max': 90, 'step': 1, 'display': 'slider'}], ['nationality_1', 'COMBO', {'default': 'Chinese', 'key': 'nationality_list'}], ['nationality_2', 'COMBO', {'key': 'nationality_list'}], ['nationality_mix', 'FLOAT'], ['body_type', 'COMBO', {'key': 'body_type_list'}], ['body_type_weight', 'FLOAT'], ['model_pose', 'COMBO', {'key': 'model_pose_list'}], ['eyes_color', 'COMBO', {'key': 'eyes_color_list'}], ['facial_expression', 'COMBO', {'key': 'face_expression_list'}], ['facial_expression_weight', 'FLOAT'], ['face_shape', 'COMBO', {'key': 'face_shape_list'}], ['face_shape_weight', 'FLOAT'], ['facial_asymmetry', 'FLOAT'], ['hair_style', 'COMBO', {'key': 'hair_style_list'}], ['hair_color', 'COMBO', {'key': 'hair_color_list'}], ['disheveled', 'FLOAT'], ['beard', 'COMBO', {'key': 'beard_list'}], ['skin_details', 'FLOAT'], ['skin_pores', 'FLOAT'], ['dimples', 'FLOAT'], ['freckles', 'FLOAT'], ['moles', 'FLOAT'], ['skin_imperfections', 'FLOAT'], ['skin_acne', 'FLOAT'], ['tanned_skin', 'FLOAT'], ['eyes_details', 'FLOAT'], ['iris_details', 'FLOAT'], ['circular_iris', 'FLOAT'], ['circular_pupil', 'FLOAT'], ['light_type', 'COMBO', {'key': 'light_type_list'}], ['light_direction', 'COMBO', {'key': 'light_direction_list'}], ['light_weight', 'FLOAT']]
        widgets = {}
        for (i, obj) in enumerate(keys):
            if obj[1] == 'COMBO':
                key = obj[2]['key'] if obj[2] and 'key' in obj[2] else obj[0]
                _list = list[key].copy()
                _list.insert(0, '-')
                widgets[obj[0]] = (_list, {**obj[2]})
            elif obj[1] == 'FLOAT':
                widgets[obj[0]] = ('FLOAT', {'default': 0, 'step': 0.05, 'min': 0, 'max': max_float_value, 'display': 'slider'})
            elif obj[1] == 'INT':
                widgets[obj[0]] = (obj[1], obj[2])
        del list
        return {'required': {**widgets, 'photorealism_improvement': (['enable', 'disable'],), 'prompt_start': ('STRING', {'multiline': True, 'default': 'raw photo, (realistic:1.5)'}), 'prompt_additional': ('STRING', {'multiline': True, 'default': ''}), 'prompt_end': ('STRING', {'multiline': True, 'default': ''}), 'negative_prompt': ('STRING', {'multiline': True, 'default': ''})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('positive', 'negative')
    FUNCTION = 'pm'
    CATEGORY = 'EasyUse/Prompt'

    def pm(self, shot='-', shot_weight=1, gender='-', body_type='-', body_type_weight=0, eyes_color='-', facial_expression='-', facial_expression_weight=0, face_shape='-', face_shape_weight=0, nationality_1='-', nationality_2='-', nationality_mix=0.5, age=30, hair_style='-', hair_color='-', disheveled=0, dimples=0, freckles=0, skin_pores=0, skin_details=0, moles=0, skin_imperfections=0, wrinkles=0, tanned_skin=0, eyes_details=1, iris_details=1, circular_iris=1, circular_pupil=1, facial_asymmetry=0, prompt_additional='', prompt_start='', prompt_end='', light_type='-', light_direction='-', light_weight=0, negative_prompt='', photorealism_improvement='disable', beard='-', model_pose='-', skin_acne=0):
        prompt = []
        if gender == '-':
            gender = ''
        else:
            if age <= 25 and gender == 'Woman':
                gender = 'girl'
            if age <= 25 and gender == 'Man':
                gender = 'boy'
            gender = ' ' + gender + ' '
        if nationality_1 != '-' and nationality_2 != '-':
            nationality = f'[{nationality_1}:{nationality_2}:{round(nationality_mix, 2)}]'
        elif nationality_1 != '-':
            nationality = nationality_1 + ' '
        elif nationality_2 != '-':
            nationality = nationality_2 + ' '
        else:
            nationality = ''
        if prompt_start != '':
            prompt.append(f'{prompt_start}')
        if shot != '-' and shot_weight > 0:
            prompt.append(f'({shot}:{round(shot_weight, 2)})')
        prompt.append(f'({nationality}{gender}{round(age)}-years-old:1.5)')
        if body_type != '-' and body_type_weight > 0:
            prompt.append(f'({body_type}, {body_type} body:{round(body_type_weight, 2)})')
        if model_pose != '-':
            prompt.append(f'({model_pose}:1.5)')
        if eyes_color != '-':
            prompt.append(f'({eyes_color} eyes:1.25)')
        if facial_expression != '-' and facial_expression_weight > 0:
            prompt.append(f'({facial_expression}, {facial_expression} expression:{round(facial_expression_weight, 2)})')
        if face_shape != '-' and face_shape_weight > 0:
            prompt.append(f'({face_shape} shape face:{round(face_shape_weight, 2)})')
        if hair_style != '-':
            prompt.append(f'({hair_style} hairstyle:1.25)')
        if hair_color != '-':
            prompt.append(f'({hair_color} hair:1.25)')
        if beard != '-':
            prompt.append(f'({beard}:1.15)')
        if disheveled != '-' and disheveled > 0:
            prompt.append(f'(disheveled:{round(disheveled, 2)})')
        if prompt_additional != '':
            prompt.append(f'{prompt_additional}')
        if skin_details > 0:
            prompt.append(f'(skin details, skin texture:{round(skin_details, 2)})')
        if skin_pores > 0:
            prompt.append(f'(skin pores:{round(skin_pores, 2)})')
        if skin_imperfections > 0:
            prompt.append(f'(skin imperfections:{round(skin_imperfections, 2)})')
        if skin_acne > 0:
            prompt.append(f'(acne, skin with acne:{round(skin_acne, 2)})')
        if wrinkles > 0:
            prompt.append(f'(skin imperfections:{round(wrinkles, 2)})')
        if tanned_skin > 0:
            prompt.append(f'(tanned skin:{round(tanned_skin, 2)})')
        if dimples > 0:
            prompt.append(f'(dimples:{round(dimples, 2)})')
        if freckles > 0:
            prompt.append(f'(freckles:{round(freckles, 2)})')
        if moles > 0:
            prompt.append(f'(skin pores:{round(moles, 2)})')
        if eyes_details > 0:
            prompt.append(f'(eyes details:{round(eyes_details, 2)})')
        if iris_details > 0:
            prompt.append(f'(iris details:{round(iris_details, 2)})')
        if circular_iris > 0:
            prompt.append(f'(circular iris:{round(circular_iris, 2)})')
        if circular_pupil > 0:
            prompt.append(f'(circular pupil:{round(circular_pupil, 2)})')
        if facial_asymmetry > 0:
            prompt.append(f'(facial asymmetry, face asymmetry:{round(facial_asymmetry, 2)})')
        if light_type != '-' and light_weight > 0:
            if light_direction != '-':
                prompt.append(f'({light_type} {light_direction}:{round(light_weight, 2)})')
            else:
                prompt.append(f'({light_type}:{round(light_weight, 2)})')
        if prompt_end != '':
            prompt.append(f'{prompt_end}')
        prompt = ', '.join(prompt)
        prompt = prompt.lower()
        if photorealism_improvement == 'enable':
            prompt = prompt + ', (professional photo, balanced photo, balanced exposure:1.2), (film grain:1.15)'
        if photorealism_improvement == 'enable':
            negative_prompt = negative_prompt + ', (shinny skin, reflections on the skin, skin reflections:1.25)'
        log_node_info('Portrait Master as generate the prompt:', prompt)
        return (prompt, negative_prompt)
```