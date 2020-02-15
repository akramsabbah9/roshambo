# accounts/utils.py

from rest_framework.serializers import ValidationError


def check_for_edit_validation_errors(defined_fields, allowed_edits, provided_fields):
    """
    Checks if there are any invalid edits in the request.
    If so, raises a validation error with a message specifying which keys are unknown, and which are forbidden to be edited.
    If not, silently allows execution to continue.

    :param set defined_fields: all the fields defined in the model.
    :param set allowed_edits: the names of the fields which are allowed to be edited.
    :param set provided_fields: the names of the fields provided to edit.
    :rtype: void
    :raises ValidationError: if there are forbidden edits (edits unspecified in allowed_edits), or unknown keys (keys not provided in defined_fields).
    """
    forbidden_edits = provided_fields - allowed_edits
    unknown_keys = provided_fields - defined_fields
    if unknown_keys or forbidden_edits:
        validation_error = {edit: 'This field cannot be edited.' for edit in forbidden_edits}
        for key in unknown_keys:
            validation_error[key] = 'Unknown field.'
        raise ValidationError(validation_error, code='invalid')

def flatten_skin_data(data):
    """
    Skins data gets returned as a nested dict thanks to nested serializers. This flattens it out, if desired.
    """
    data['active_skin'] = data['active_skin']['skin']
    data['purchased_skins'] = [skin_wrap['skin'] for skin_wrap in data['purchased_skins']]
