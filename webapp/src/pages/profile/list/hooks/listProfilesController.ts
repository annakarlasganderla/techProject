/* eslint-disable react-hooks/rules-of-hooks */
import { useFormik } from "formik";
import { useState } from "react";
import UserApi from "../../../../api/User";
import useAuth from "../../../../context/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Users } from "../../../../types/user.types";

export const profileListController = () => {
  const { user } = useAuth();
  const [usersList, setUsersList] = useState<Users[]>([]);
  const [error, setError] = useState();
  const userApi = UserApi();
  const queryClient = useQueryClient();

  const { isFetching } = useQuery<Users>(["users-list"], {
    queryFn: async () => await userApi.listUsers(),
    onSuccess: (data) => {
      return setUsersList(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteUser = useMutation(
	async (id: string | undefined) => {
		if (id) {
			return await userApi.deleteUser(id);
		}
	},
	
);

  return { usersList, error, user, deleteUser };
};
