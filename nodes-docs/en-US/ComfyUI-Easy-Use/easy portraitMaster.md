---
tags:
- Prompt
---

# Portrait Master
## Documentation
- Class name: `easy portraitMaster`
- Category: `EasyUse/Prompt`
- Output node: `False`

This node is designed to generate customized prompts for enhancing portrait images, incorporating a wide range of attributes such as facial features, lighting conditions, and stylistic details. It allows for detailed customization of portraits, aiming to improve photorealism or achieve specific artistic styles.
## Input types
### Required
- **`shot`**
    - Specifies the type of shot or framing for the portrait, affecting the composition and focus of the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`shot_weight`**
    - Determines the emphasis or weight of the shot type in the final prompt, influencing the overall composition of the portrait.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`gender`**
    - Defines the gender of the subject in the portrait, which can influence the portrayal and stylistic elements of the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`age`**
    - Sets the age of the subject, affecting the realism and context of the portrait by adjusting age-related features.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`nationality_i`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`nationality_mix`**
    - Determines the mix ratio between the first and second nationalities, enabling nuanced representation of mixed heritage.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`body_type`**
    - Defines the body type of the subject, influencing the portrayal of physical characteristics in the portrait.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`body_type_weight`**
    - Determines the emphasis or weight of the body type in the final prompt, affecting the representation of the subject's physique.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`model_pose`**
    - Specifies the pose of the model in the portrait, affecting the dynamism and overall composition of the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`eyes_color`**
    - Sets the eye color of the subject, adding to the visual detail and realism of the portrait.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`facial_expression`**
    - Defines the facial expression of the subject, influencing the emotional tone and expressiveness of the portrait.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`facial_expression_weight`**
    - Determines the emphasis or weight of the facial expression in the final prompt, affecting the portrayed emotion.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`face_shape`**
    - Specifies the shape of the face, contributing to the overall appearance and character of the subject.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`face_shape_weight`**
    - Determines the emphasis or weight of the face shape in the final prompt, influencing the portrayal of facial structure.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`facial_asymmetry`**
    - Defines the degree of facial asymmetry to be applied, adding to the naturalness and individuality of the portrait.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`hair_style`**
    - Defines the hairstyle of the subject, contributing to the style and personality of the portrait.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`hair_color`**
    - Specifies the hair color, adding to the visual detail and aesthetic appeal of the portrait.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`disheveled`**
    - Indicates the level of dishevelment in the subject's appearance, adding a sense of realism or stylistic choice.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`beard`**
    - Specifies the presence and style of a beard, contributing to the masculinity and character of the subject.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`skin_details`**
    - Determines the level of skin detail to be included, enhancing the texture and realism of the portrait.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`skin_pores`**
    - Specifies the visibility of skin pores, contributing to the photorealistic detail of the subject's skin.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`dimples`**
    - Indicates the presence of dimples, adding to the character and expressiveness of the subject's smile.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`freckles`**
    - Specifies the presence of freckles, adding to the uniqueness and realism of the subject's appearance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`moles`**
    - Indicates the presence of moles, contributing to the individuality and realism of the portrait.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`skin_imperfections`**
    - Specifies the level of skin imperfections to be included, enhancing the realism and character of the portrait.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`skin_acne`**
    - Indicates the presence of acne, contributing to the realism and age-specific characteristics of the subject.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`tanned_skin`**
    - Specifies the level of tan on the subject's skin, affecting the coloration and realism of the portrait.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`eyes_details`**
    - Determines the level of detail in the eyes, enhancing the expressiveness and realism of the portrait.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`iris_details`**
    - Specifies the level of detail in the iris, contributing to the depth and realism of the eyes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`circular_iris`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`circular_pupil`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`light_type`**
    - Specifies the type of lighting to be applied, influencing the mood and visual impact of the portrait.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`light_direction`**
    - Controls the direction of the applied lighting, enhancing the three-dimensionality and realism of the portrait.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`light_weight`**
    - Determines the intensity of the applied light type, affecting the contrast and depth of the portrait.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`photorealism_improvement`**
    - Enables or disables photorealism improvements, adding professional photo qualities and reducing shininess on the skin.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`prompt_start`**
    - Allows for the addition of custom text at the beginning of the prompt, enabling further customization of the portrait enhancement.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prompt_additional`**
    - Enables the inclusion of additional custom text within the prompt, offering more detailed customization options.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prompt_end`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`negative_prompt`**
    - Specifies custom text for mitigating negative aspects in the portrait, aiming to refine the enhancement process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`positive`**
    - Comfy dtype: `STRING`
    - Contains the generated prompt text for enhancing the portrait with positive attributes.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `STRING`
    - Includes the generated prompt text for mitigating negative aspects in the portrait enhancement process.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class portraitMaster:

    @classmethod
    def INPUT_TYPES(s):
        max_float_value = 1.95
        prompt_path = os.path.join(RESOURCES_DIR, 'portrait_prompt.json')
        if not os.path.exists(prompt_path):
            response = urlopen('https://raw.githubusercontent.com/yolain/ComfyUI-Easy-Use/main/resources/portrait_prompt.json')
            temp_prompt = json.loads(response.read())
            prompt_serialized = json.dumps(temp_prompt, indent=4)
            with open(prompt_path, "w") as f:
                f.write(prompt_serialized)
            del response, temp_prompt
        # Load local
        with open(prompt_path, 'r') as f:
            list = json.load(f)
        keys = [
            ['shot', 'COMBO', {"key": "shot_list"}], ['shot_weight', 'FLOAT'],
            ['gender', 'COMBO', {"default": "Woman", "key": "gender_list"}], ['age', 'INT', {"default": 30, "min": 18, "max": 90, "step": 1, "display": "slider"}],
            ['nationality_1', 'COMBO', {"default": "Chinese", "key": "nationality_list"}], ['nationality_2', 'COMBO', {"key": "nationality_list"}], ['nationality_mix', 'FLOAT'],
            ['body_type', 'COMBO', {"key": "body_type_list"}], ['body_type_weight', 'FLOAT'], ['model_pose', 'COMBO', {"key": "model_pose_list"}], ['eyes_color', 'COMBO', {"key": "eyes_color_list"}],
            ['facial_expression', 'COMBO', {"key": "face_expression_list"}], ['facial_expression_weight', 'FLOAT'], ['face_shape', 'COMBO', {"key": "face_shape_list"}], ['face_shape_weight', 'FLOAT'], ['facial_asymmetry', 'FLOAT'],
            ['hair_style', 'COMBO', {"key": "hair_style_list"}], ['hair_color', 'COMBO', {"key": "hair_color_list"}], ['disheveled', 'FLOAT'], ['beard', 'COMBO', {"key": "beard_list"}],
            ['skin_details', 'FLOAT'], ['skin_pores', 'FLOAT'], ['dimples', 'FLOAT'], ['freckles', 'FLOAT'],
            ['moles', 'FLOAT'], ['skin_imperfections', 'FLOAT'], ['skin_acne', 'FLOAT'], ['tanned_skin', 'FLOAT'],
            ['eyes_details', 'FLOAT'], ['iris_details', 'FLOAT'], ['circular_iris', 'FLOAT'], ['circular_pupil', 'FLOAT'],
            ['light_type', 'COMBO', {"key": "light_type_list"}], ['light_direction', 'COMBO', {"key": "light_direction_list"}], ['light_weight', 'FLOAT']
        ]
        widgets = {}
        for i, obj in enumerate(keys):
            if obj[1] == 'COMBO':
                key = obj[2]['key'] if obj[2] and 'key' in obj[2] else obj[0]
                _list = list[key].copy()
                _list.insert(0, '-')
                widgets[obj[0]] = (_list, {**obj[2]})
            elif obj[1] == 'FLOAT':
                widgets[obj[0]] = ("FLOAT", {"default": 0, "step": 0.05, "min": 0, "max": max_float_value, "display": "slider",})
            elif obj[1] == 'INT':
                widgets[obj[0]] = (obj[1], obj[2])
        del list
        return {
            "required": {
                **widgets,
                "photorealism_improvement": (["enable", "disable"],),
                "prompt_start": ("STRING", {"multiline": True, "default": "raw photo, (realistic:1.5)"}),
                "prompt_additional": ("STRING", {"multiline": True, "default": ""}),
                "prompt_end": ("STRING", {"multiline": True, "default": ""}),
                "negative_prompt": ("STRING", {"multiline": True, "default": ""}),
            }
        }

    RETURN_TYPES = ("STRING", "STRING",)
    RETURN_NAMES = ("positive", "negative",)

    FUNCTION = "pm"

    CATEGORY = "EasyUse/Prompt"

    def pm(self, shot="-", shot_weight=1, gender="-", body_type="-", body_type_weight=0, eyes_color="-",
           facial_expression="-", facial_expression_weight=0, face_shape="-", face_shape_weight=0,
           nationality_1="-", nationality_2="-", nationality_mix=0.5, age=30, hair_style="-", hair_color="-",
           disheveled=0, dimples=0, freckles=0, skin_pores=0, skin_details=0, moles=0, skin_imperfections=0,
           wrinkles=0, tanned_skin=0, eyes_details=1, iris_details=1, circular_iris=1, circular_pupil=1,
           facial_asymmetry=0, prompt_additional="", prompt_start="", prompt_end="", light_type="-",
           light_direction="-", light_weight=0, negative_prompt="", photorealism_improvement="disable", beard="-",
           model_pose="-", skin_acne=0):

        prompt = []

        if gender == "-":
            gender = ""
        else:
            if age <= 25 and gender == 'Woman':
                gender = 'girl'
            if age <= 25 and gender == 'Man':
                gender = 'boy'
            gender = " " + gender + " "

        if nationality_1 != '-' and nationality_2 != '-':
            nationality = f"[{nationality_1}:{nationality_2}:{round(nationality_mix, 2)}]"
        elif nationality_1 != '-':
            nationality = nationality_1 + " "
        elif nationality_2 != '-':
            nationality = nationality_2 + " "
        else:
            nationality = ""

        if prompt_start != "":
            prompt.append(f"{prompt_start}")

        if shot != "-" and shot_weight > 0:
            prompt.append(f"({shot}:{round(shot_weight, 2)})")

        prompt.append(f"({nationality}{gender}{round(age)}-years-old:1.5)")

        if body_type != "-" and body_type_weight > 0:
            prompt.append(f"({body_type}, {body_type} body:{round(body_type_weight, 2)})")

        if model_pose != "-":
            prompt.append(f"({model_pose}:1.5)")

        if eyes_color != "-":
            prompt.append(f"({eyes_color} eyes:1.25)")

        if facial_expression != "-" and facial_expression_weight > 0:
            prompt.append(
                f"({facial_expression}, {facial_expression} expression:{round(facial_expression_weight, 2)})")

        if face_shape != "-" and face_shape_weight > 0:
            prompt.append(f"({face_shape} shape face:{round(face_shape_weight, 2)})")

        if hair_style != "-":
            prompt.append(f"({hair_style} hairstyle:1.25)")

        if hair_color != "-":
            prompt.append(f"({hair_color} hair:1.25)")

        if beard != "-":
            prompt.append(f"({beard}:1.15)")

        if disheveled != "-" and disheveled > 0:
            prompt.append(f"(disheveled:{round(disheveled, 2)})")

        if prompt_additional != "":
            prompt.append(f"{prompt_additional}")

        if skin_details > 0:
            prompt.append(f"(skin details, skin texture:{round(skin_details, 2)})")

        if skin_pores > 0:
            prompt.append(f"(skin pores:{round(skin_pores, 2)})")

        if skin_imperfections > 0:
            prompt.append(f"(skin imperfections:{round(skin_imperfections, 2)})")

        if skin_acne > 0:
            prompt.append(f"(acne, skin with acne:{round(skin_acne, 2)})")

        if wrinkles > 0:
            prompt.append(f"(skin imperfections:{round(wrinkles, 2)})")

        if tanned_skin > 0:
            prompt.append(f"(tanned skin:{round(tanned_skin, 2)})")

        if dimples > 0:
            prompt.append(f"(dimples:{round(dimples, 2)})")

        if freckles > 0:
            prompt.append(f"(freckles:{round(freckles, 2)})")

        if moles > 0:
            prompt.append(f"(skin pores:{round(moles, 2)})")

        if eyes_details > 0:
            prompt.append(f"(eyes details:{round(eyes_details, 2)})")

        if iris_details > 0:
            prompt.append(f"(iris details:{round(iris_details, 2)})")

        if circular_iris > 0:
            prompt.append(f"(circular iris:{round(circular_iris, 2)})")

        if circular_pupil > 0:
            prompt.append(f"(circular pupil:{round(circular_pupil, 2)})")

        if facial_asymmetry > 0:
            prompt.append(f"(facial asymmetry, face asymmetry:{round(facial_asymmetry, 2)})")

        if light_type != '-' and light_weight > 0:
            if light_direction != '-':
                prompt.append(f"({light_type} {light_direction}:{round(light_weight, 2)})")
            else:
                prompt.append(f"({light_type}:{round(light_weight, 2)})")

        if prompt_end != "":
            prompt.append(f"{prompt_end}")

        prompt = ", ".join(prompt)
        prompt = prompt.lower()

        if photorealism_improvement == "enable":
            prompt = prompt + ", (professional photo, balanced photo, balanced exposure:1.2), (film grain:1.15)"

        if photorealism_improvement == "enable":
            negative_prompt = negative_prompt + ", (shinny skin, reflections on the skin, skin reflections:1.25)"

        log_node_info("Portrait Master as generate the prompt:", prompt)

        return (prompt, negative_prompt,)

```
