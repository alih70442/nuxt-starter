import { defineStore } from 'pinia';
import mapUserStore from '@/assets/js/mappers/mapUserStore';
import { get_active_role } from '@/assets/js/helpers/get_active_role';

const CURRENT_USER_ROLE = get_active_role();

const useUserStore = defineStore(mapUserStore(CURRENT_USER_ROLE));

export { useUserStore, CURRENT_USER_ROLE };
